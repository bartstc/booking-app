export interface IAmqpService {
  sendMessage<T>(message: T, routingKey: string): Promise<void>;
}
