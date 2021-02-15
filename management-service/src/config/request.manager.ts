import { Request, Response } from 'express';

export class RequestManager {
  static getIp(req: Request) {
    return req.ip || (req.connection && req.connection.remoteAddress) || '-';
  }

  static getUrl(req: Request): string {
    return req.originalUrl || req.url || req.baseUrl || '-';
  }

  static getPath(req: Request): string {
    return this.getUrl(req).split('?')[0];
  }

  static getAction(req: Request): string {
    return this.getUrl(req).split('/')[1];
  }

  static getHttpVersion(req: Request): string {
    return req.httpVersionMajor + '.' + req.httpVersionMinor;
  }

  static getResponseHeader(res: Response, field: string) {
    if (!res.headersSent) {
      return undefined;
    }

    const header = res.getHeader(field);

    return Array.isArray(header) ? header.join(', ') : header || '-';
  }

  static getReferrer(req: Request) {
    const referer = req.headers.referer || req.headers.referrer || '-';

    if (typeof referer === 'string') {
      return referer;
    }

    return referer[0];
  }

  static getOrigin(req: Request) {
    const origin = req.headers.origin;

    if (!origin || typeof origin === 'string') {
      return origin as string;
    }

    return origin[0];
  }

  static getMethod(req: Request) {
    return req.method;
  }

  static getUserAgent(req: Request) {
    return req.headers['user-agent'] || '-';
  }
}
