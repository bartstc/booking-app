export interface ILoggerService {
  log(message: unknown, context?: string): void;
  info(message: unknown, context?: string): void;
  warn(message: unknown, context?: string): void;
  error(message: unknown, context?: string): void;
}
