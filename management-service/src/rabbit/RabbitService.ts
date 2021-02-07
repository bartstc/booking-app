export interface RabbitService {
  emit<Event>(pattern: string, event: Event): Promise<any>;
}
