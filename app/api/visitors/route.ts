import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

type ContadorPersistido = {
  total: number;
  atualizadoEm: string | null;
  ips: string[];
};

const caminhoPadrao = path.join(process.cwd(), 'data', 'visitors.json');
const caminhoArmazenamento = process.env.VISITOR_STORAGE_PATH ?? caminhoPadrao;

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

const lerContador = async (): Promise<ContadorPersistido> => {
  try {
    const dados = await fs.readFile(caminhoArmazenamento, 'utf8');
    const parsed = JSON.parse(dados) as ContadorPersistido;

    return {
      total: Number.isFinite(parsed.total) ? parsed.total : 0,
      atualizadoEm: typeof parsed.atualizadoEm === 'string' ? parsed.atualizadoEm : null,
      ips: Array.isArray(parsed.ips) ? parsed.ips : []
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }

    return {
      total: 0,
      atualizadoEm: null,
      ips: []
    };
  }
};

const salvarContador = async (contador: ContadorPersistido) => {
  await fs.mkdir(path.dirname(caminhoArmazenamento), { recursive: true });
  await fs.writeFile(caminhoArmazenamento, JSON.stringify(contador, null, 2), 'utf8');
};

export async function GET() {
  const contador = await lerContador();

  return Response.json({
    sucesso: true,
    total: contador.total,
    atualizadoEm: contador.atualizadoEm
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
  const contador = await lerContador();
  const jaRegistrado = contador.ips.includes(hashIp);
  let registrado = !jaRegistrado;

  if (!jaRegistrado) {
    contador.ips = [...contador.ips, hashIp];
    contador.total += 1;
    contador.atualizadoEm = agora;
  }

  await salvarContador(contador);

  return Response.json({
    sucesso: true,
    registrado,
    total: contador.total,
    atualizadoEm: contador.atualizadoEm
  });
}
