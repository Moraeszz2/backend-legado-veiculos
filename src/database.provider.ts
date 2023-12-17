import { DataSource } from 'typeorm';

// Número máximo de tentativas de criação do DataSource
const maxRetries = 3;

async function createDataSourceWithRetry(dbName: string): Promise<DataSource> {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: dbName,
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: false,
        logger: process.env.NODE_ENV ? 'advanced-console' : 'simple-console',
        logging: process.env.NODE_ENV ? true : false,
      });

      await dataSource.initialize();
      return dataSource;
    } catch (err) {
      console.error(`Erro ao criar o DataSource para o banco de dados ${dbName}:`, err);

      // Aguardar um pequeno intervalo antes de fazer uma nova tentativa
      // 2 segundos
      const delay = 2000;
      await new Promise((resolve) => setTimeout(resolve, delay));

      retries++;
    }
  }

  throw new Error(`Falha na criação do DataSource para o banco de dados ${dbName}`);
}

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE_HUBBA',
    useFactory: async () => createDataSourceWithRetry(process.env.DB_NAME_HUBBA),
  },
  {
    provide: 'DATA_SOURCE_SUC',
    useFactory: async () => createDataSourceWithRetry(process.env.DB_NAME_SUC),
  },
];