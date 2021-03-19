import { BasicLog, LogLevel } from './Logger';
import { AjaxError } from '../http';

export const logHandler = <Log>(log: Log) => {
  // todo: send to graylog
  // managementHttpService.post('logs', log).catch(() => {});
  // eslint-disable-next-line no-console
  console.log('Logger', log);
};

export const mapAjaxErrorToLog = (error: AjaxError, componentStack?: string): BasicLog => {
  return {
    name: error.name,
    message: error.message,
    level: LogLevel.Error,
    route: decodeURI(window.location.href),
    stacktrace: componentStack,
    request: JSON.stringify(error.request),
    response: JSON.stringify(error.response),
  };
};
