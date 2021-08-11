type Handler = <LogType extends BasicLog>(log: LogType) => void;

export enum LogLevel {
  Emergency = 'emergency',
  Alert = 'alert',
  Critical = 'critical',
  Error = 'error',
  Warning = 'warning',
  Notice = 'notice',
  Info = 'info',
  Debug = 'debug',
}

export interface BasicLog {
  name: string;
  message: string;
  level: LogLevel;
  route?: string;
  stacktrace?: string;
  user?: object;
  request?: string;
  response?: string;
}

interface LoggerOptions {
  sendAll: boolean;
}

const addErrorListener = (handler: (event: ErrorEvent) => void) => {
  window.addEventListener<'error'>('error', handler);

  return () => {
    window.removeEventListener('error', handler);
  };
};

class Logger {
  private static handler: Handler;
  private static options: LoggerOptions = { sendAll: false };
  public static context = new Map<string, unknown>();

  private constructor() {
    throw Error('Logger is not a constructor');
  }

  public static init(handler: Handler, options: LoggerOptions = Logger.options): Function {
    Logger.handler = handler;
    Logger.options = options;

    return addErrorListener(async event => {
      await Logger.log({
        name: event?.type,
        level: LogLevel.Error,
        message: event?.message,
        route: decodeURI(window.location.href),
        stacktrace: event?.error?.stack,
        request: JSON.stringify(event?.error?.request),
        response: JSON.stringify(event?.error?.response),
      });
    });
  }

  public static log<LogType extends BasicLog>(log: LogType, options: LoggerOptions = Logger.options): void {
    if (!Logger.handler) {
      throw Error('Logger not initialized');
    }

    if (!options.sendAll && log.message.includes('Uncaught AjaxError')) {
      return;
    }

    if (Logger.context.size !== 0) {
      Logger.context.forEach((value, key) => {
        log = {
          [key]: value,
          route: decodeURI(window.location.href),
          ...log,
        };
      });
    }

    Logger.handler(log);
  }
}

export { Logger };
