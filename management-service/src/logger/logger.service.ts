import { Injectable, Logger } from '@nestjs/common';

import { ILoggerService } from './ILoggerService';

enum ELogLevel {
  Debug,
  Info,
  Warn,
  Error,
}

@Injectable()
export class LoggerService extends Logger implements ILoggerService {
  private readonly _currentLevel: ELogLevel =
    (ELogLevel[process.env.LOGGER_LEVEL] as ELogLevel) ?? ELogLevel.Info;

  constructor(private readonly _context?: string) {
    super(_context);
  }

  public log(message: unknown, context?: string) {
    if (this.isValidLevel(ELogLevel.Debug)) {
      Logger.verbose(JSON.stringify(message), context || this._context);
    }
  }

  public info(message: unknown, context?: string) {
    if (this.isValidLevel(ELogLevel.Info)) {
      Logger.verbose(JSON.stringify(message), context || this._context);
    }
  }

  public warn(message: unknown, context?: string) {
    if (this.isValidLevel(ELogLevel.Warn)) {
      Logger.warn(JSON.stringify(message), context || this._context);
    }
  }

  public error(message: unknown, trace?: string, context?: string) {
    if (this.isValidLevel(ELogLevel.Error)) {
      Logger.error(JSON.stringify(message), trace, context || this._context);
    }
  }

  private isValidLevel(level: ELogLevel): boolean {
    return level >= this._currentLevel;
  }
}
