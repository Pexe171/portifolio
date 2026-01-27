import crypto from 'crypto';
import type { NextRequest } from 'next/server';

type DynamoError = Error & { details?: Record<string, unknown> };

type DynamoGetItemResponse = {
  Item?: {
    total?: { N: string };
    atualizadoEm?: { S: string };
  };
};

export const runtime = 'nodejs';

const tabelaVisitantes = process.env.VISITOR_TABLE_NAME;
const regiaoAws = process.env.AWS_REGION ?? 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const sessionToken = process.env.AWS_SESSION_TOKEN;

const obterIp = (request: NextRequest) => {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return request.ip ?? null;
};

const sha256 = (valor: string) => crypto.createHash('sha256').update(valor, 'utf8').digest('hex');

const hmacSha256 = (chave: Buffer | string, valor: string) =>
  crypto.createHmac('sha256', chave).update(valor, 'utf8').digest();

const criarAssinatura = (dataStamp: string) => {
  if (!secretAccessKey) {
    return null;
  }

  const kDate = hmacSha256(`AWS4${secretAccessKey}`, dataStamp);
  const kRegion = hmacSha256(kDate, regiaoAws);
  const kService = hmacSha256(kRegion, 'dynamodb');
  return hmacSha256(kService, 'aws4_request');
};

const requisitarDynamo = async (target: string, body: Record<string, unknown>) => {
  if (!accessKeyId || !secretAccessKey) {
    throw new Error('Credenciais AWS ausentes.');
  }

  const host = `dynamodb.${regiaoAws}.amazonaws.com`;
  const endpoint = `https://${host}/`;
  const amzDate = new Date().toISOString().replace(/[:-]|\.|Z/g, '').slice(0, 15) + 'Z';
  const dateStamp = amzDate.slice(0, 8);
  const payload = JSON.stringify(body);

  const headers: Record<string, string> = {
    'content-type': 'application/x-amz-json-1.0',
    host,
    'x-amz-date': amzDate,
    'x-amz-target': target
  };

  if (sessionToken) {
    headers['x-amz-security-token'] = sessionToken;
  }

  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map((key) => `${key.toLowerCase()}:${headers[key].trim()}\n`)
    .join('');
  const signedHeaders = Object.keys(headers)
    .sort()
    .map((key) => key.toLowerCase())
    .join(';');

  const canonicalRequest = [
    'POST',
    '/',
    '',
    canonicalHeaders,
    signedHeaders,
    sha256(payload)
  ].join('\n');

  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    `${dateStamp}/${regiaoAws}/dynamodb/aws4_request`,
    sha256(canonicalRequest)
  ].join('\n');

  const assinaturaChave = criarAssinatura(dateStamp);
  if (!assinaturaChave) {
    throw new Error('Não foi possível criar assinatura AWS.');
  }

  const assinatura = crypto.createHmac('sha256', assinaturaChave).update(stringToSign, 'utf8').digest('hex');
  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${dateStamp}/${regiaoAws}/dynamodb/aws4_request, SignedHeaders=${signedHeaders}, Signature=${assinatura}`;

  const resposta = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: authorization
    },
    body: payload
  });

  const dados = (await resposta.json().catch(() => ({}))) as Record<string, unknown>;

  if (!resposta.ok) {
    const tipo = typeof dados.__type === 'string' ? dados.__type.split('#').pop() : 'ErroDynamoDB';
    const mensagem = typeof dados.message === 'string' ? dados.message : 'Erro ao comunicar com o DynamoDB.';
    const erro = new Error(mensagem) as DynamoError;
    erro.name = tipo ?? 'ErroDynamoDB';
    erro.details = dados;
    throw erro;
  }

  return dados;
};

const obterTotal = async () => {
  const resposta = (await requisitarDynamo('DynamoDB_20120810.GetItem', {
    TableName: tabelaVisitantes,
    Key: {
      pk: { S: 'counter' }
    }
  })) as DynamoGetItemResponse;

  return {
    total: Number(resposta.Item?.total?.N ?? 0),
    atualizadoEm: resposta.Item?.atualizadoEm?.S ?? null
  };
};

const registrarVisita = async (hashIp: string, agora: string) => {
  await requisitarDynamo('DynamoDB_20120810.TransactWriteItems', {
    TransactItems: [
      {
        Put: {
          TableName: tabelaVisitantes,
          Item: {
            pk: { S: `ip#${hashIp}` },
            criadoEm: { S: agora },
            tipo: { S: 'ip' }
          },
          ConditionExpression: 'attribute_not_exists(pk)'
        }
      },
      {
        Update: {
          TableName: tabelaVisitantes,
          Key: {
            pk: { S: 'counter' }
          },
          UpdateExpression: 'ADD total :incremento SET atualizadoEm = :agora',
          ExpressionAttributeValues: {
            ':incremento': { N: '1' },
            ':agora': { S: agora }
          }
        }
      }
    ]
  });
};

const validarConfiguracao = () => {
  if (!tabelaVisitantes) {
    return 'Tabela de visitantes não configurada.';
  }

  if (!accessKeyId || !secretAccessKey) {
    return 'Credenciais AWS não configuradas.';
  }

  return null;
};

export async function GET() {
  const erroConfig = validarConfiguracao();
  if (erroConfig) {
    return Response.json(
      {
        sucesso: false,
        mensagem: erroConfig
      },
      { status: 500 }
    );
  }

  const contador = await obterTotal();

  return Response.json({
    sucesso: true,
    ...contador
  });
}

export async function POST(request: NextRequest) {
  const erroConfig = validarConfiguracao();
  if (erroConfig) {
    return Response.json(
      {
        sucesso: false,
        mensagem: erroConfig
      },
      { status: 500 }
    );
  }

  const ip = obterIp(request);
  if (!ip) {
    return Response.json(
      {
        sucesso: false,
        mensagem: 'Não foi possível identificar o IP do visitante.'
      },
      { status: 400 }
    );
  }

  const hashIp = sha256(ip);
  const agora = new Date().toISOString();
  let registrado = false;

  try {
    await registrarVisita(hashIp, agora);
    registrado = true;
  } catch (error) {
    const erroDynamo = error as DynamoError;
    const tipoErro = erroDynamo?.name ?? 'ErroDynamoDB';
    const detalhes = erroDynamo?.details as { CancellationReasons?: Array<{ Code?: string }> } | undefined;
    const cancelado = tipoErro === 'TransactionCanceledException';
    const jaExistia = detalhes?.CancellationReasons?.some((reason) => reason.Code === 'ConditionalCheckFailed');

    if (!cancelado || !jaExistia) {
      console.error('Erro ao registrar visitante:', error);
      return Response.json(
        {
          sucesso: false,
          mensagem: 'Não foi possível registrar a visita agora.'
        },
        { status: 500 }
      );
    }
  }

  const contador = await obterTotal();

  return Response.json({
    sucesso: true,
    registrado,
    ...contador
  });
}
