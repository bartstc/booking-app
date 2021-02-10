export interface IConfigService {
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  logger: {
    level: string;
  };
  amqp: {
    user: string;
    password: string;
    host: string;
    queue: string;
  };
}
