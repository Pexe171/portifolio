type MongoConfigDataApi = {
  apiUrl: string;
  apiKey: string;
  dataSource: string;
  database: string;
};

type MongoAction = 'findOne' | 'updateOne' | 'insertOne' | 'find' | 'count';

const obterConfigDataApi = (): MongoConfigDataApi | null => {
  const apiUrl = process.env.MONGODB_DATA_API_URL;
  const apiKey = process.env.MONGODB_DATA_API_KEY;
  const dataSource = process.env.MONGODB_DATA_SOURCE;
  const database = process.env.MONGODB_DB;

  if (!apiUrl || !apiKey || !dataSource || !database) {
    return null;
  }

  return { apiUrl, apiKey, dataSource, database };
};

let clientePromessa: Promise<unknown> | null = null;

const carregarMongoDriver = async () => {
  try {
    const loader = new Function('return import("mongodb")');
    return (await loader()) as { MongoClient: new (uri: string) => any };
  } catch (error) {
    return null;
  }
};

const obterClienteMongo = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }

  if (clientePromessa) {
    return clientePromessa;
  }

  const modulo = await carregarMongoDriver();
  if (!modulo?.MongoClient) {
    return null;
  }

  const cliente = new modulo.MongoClient(uri);
  clientePromessa = cliente.connect();
  return clientePromessa;
};

const obterNomeDb = (uri: string) => {
  const nomeEnv = process.env.MONGODB_DB;
  if (nomeEnv) {
    return nomeEnv;
  }

  try {
    const pathname = new URL(uri).pathname.replace('/', '');
    return pathname || 'portfolio';
  } catch (error) {
    return 'portfolio';
  }
};

const chamarMongoDataApi = async <T>(action: MongoAction, body: Record<string, unknown>): Promise<T | null> => {
  const config = obterConfigDataApi();
  if (!config) {
    return null;
  }

  const resposta = await fetch(`${config.apiUrl}/action/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': config.apiKey
    },
    body: JSON.stringify({
      dataSource: config.dataSource,
      database: config.database,
      ...body
    })
  });

  if (!resposta.ok) {
    return null;
  }

  return (await resposta.json()) as T;
};

const chamarMongoDriver = async <T>(
  collection: string,
  operacao: (collection: any) => Promise<T>
): Promise<T | null> => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }

  const cliente = await obterClienteMongo();
  if (!cliente) {
    return null;
  }

  const db = (cliente as any).db(obterNomeDb(uri));
  return operacao(db.collection(collection));
};

export const mongoFindOne = async <T>(collection: string, filter: Record<string, unknown>) => {
  const viaDriver = await chamarMongoDriver<T | null>(collection, (colecao) => colecao.findOne(filter));
  if (viaDriver) {
    return { document: viaDriver };
  }

  return chamarMongoDataApi<{ document: T | null }>('findOne', { collection, filter });
};

export const mongoUpdateOne = async (
  collection: string,
  filter: Record<string, unknown>,
  update: Record<string, unknown>,
  upsert = false
) => {
  const viaDriver = await chamarMongoDriver(collection, (colecao) =>
    colecao.updateOne(filter, update, { upsert })
  );
  if (viaDriver) {
    return viaDriver as { matchedCount: number; modifiedCount: number; upsertedId?: string };
  }

  return chamarMongoDataApi<{ matchedCount: number; modifiedCount: number; upsertedId?: string }>('updateOne', {
    collection,
    filter,
    update,
    upsert
  });
};

export const mongoInsertOne = async <T>(collection: string, document: T) => {
  const viaDriver = await chamarMongoDriver(collection, (colecao) => colecao.insertOne(document));
  if (viaDriver) {
    return { insertedId: (viaDriver as any).insertedId?.toString() };
  }

  return chamarMongoDataApi<{ insertedId: string }>('insertOne', { collection, document });
};

export const mongoFind = async <T>(
  collection: string,
  filter: Record<string, unknown>,
  options?: { sort?: Record<string, 1 | -1>; limit?: number }
) => {
  const viaDriver = await chamarMongoDriver<T[]>(collection, async (colecao) => {
    let cursor = colecao.find(filter);
    if (options?.sort) {
      cursor = cursor.sort(options.sort);
    }
    if (options?.limit) {
      cursor = cursor.limit(options.limit);
    }
    return cursor.toArray();
  });

  if (viaDriver) {
    return { documents: viaDriver };
  }

  return chamarMongoDataApi<{ documents: T[] }>('find', { collection, filter, ...options });
};

export const mongoCount = async (collection: string, filter: Record<string, unknown>) => {
  const viaDriver = await chamarMongoDriver<number>(collection, (colecao) => colecao.countDocuments(filter));
  if (typeof viaDriver === 'number') {
    return { count: viaDriver };
  }

  return chamarMongoDataApi<{ count: number }>('count', { collection, filter });
};

export const mongoDisponivel = () => Boolean(process.env.MONGODB_URI || obterConfigDataApi());
