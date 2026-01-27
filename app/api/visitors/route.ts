import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import type { NextRequest } from 'next/server';

type VisitorStore = {
  total: number;
  atualizadoEm: string | null;
  ips: string[];
};

export const runtime = 'nodejs';

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

const caminhoPadrao = () => {
  if (process.env.VISITOR_STORE_PATH) {
    return process.env.VISITOR_STORE_PATH;
  }

  if (process.env.NODE_ENV === 'production') {
    return '/tmp/visitors.json';
  }

  return path.join(process.cwd(), '.data', 'visitors.json');
};

const garantirDiretorio = async (caminho: string) => {
  const diretorio = path.dirname(caminho);
  await fs.mkdir(diretorio, { recursive: true });
};

const lerStore = async (caminho: string): Promise<VisitorStore> => {
  try {
    const conteudo = await fs.readFile(caminho, 'utf8');
    const dados = JSON.parse(conteudo) as VisitorStore;

    return {
      total: Number(dados.total ?? 0),
      atualizadoEm: dados.atualizadoEm ?? null,
      ips: Array.isArray(dados.ips) ? dados.ips : []
    };
  } catch (error) {
    return {
      total: 0,
      atualizadoEm: null,
      ips: []
    };
  }
};

const salvarStore = async (caminho: string, dados: VisitorStore) => {
  await garantirDiretorio(caminho);
  await fs.writeFile(caminho, JSON.stringify(dados, null, 2), 'utf8');
};

const obterTotal = async () => {
  const caminho = caminhoPadrao();
  const store = await lerStore(caminho);

  return {
    total: store.total,
    atualizadoEm: store.atualizadoEm
  };
};

export async function GET() {
  const contador = await obterTotal();

  return Response.json({
    sucesso: true,
    ...contador
  });
}

export async function POST(request: NextRequest) {
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
  const caminho = caminhoPadrao();
  const store = await lerStore(caminho);

  let registrado = false;
  if (!store.ips.includes(hashIp)) {
    store.ips.push(hashIp);
    store.total += 1;
    store.atualizadoEm = agora;
    registrado = true;
    await salvarStore(caminho, store);
  }

  return Response.json({
    sucesso: true,
    registrado,
    total: store.total,
    atualizadoEm: store.atualizadoEm
  });
}
