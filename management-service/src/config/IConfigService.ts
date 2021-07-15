import { ExchangeType } from '../amqp/amqp.service';

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
    port: number;
    name: string;
    queue: string;
    exchange: string;
    exchangeType: ExchangeType;
    reconnectDelay: number;
    prefetch: number;
  };
  auth: {
    employeeWebClientAuthClientId: string;
    authDomain: string;
    authDbConnection: string;
  };
}
