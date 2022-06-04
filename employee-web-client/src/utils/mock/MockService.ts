/* eslint-disable @typescript-eslint/no-explicit-any */
import { rest } from 'msw';

import { UrlService } from '../http/UrlService';

type Callback<T> = () => T;

const { parse } = new UrlService();
const msw = () => (process.env.STORYBOOK === 'true' ? require('msw.browser').worker : require('msw.server').server);

const dictionary = new Map();

class MockService {
  constructor(private readonly host: string) {
    this.host = host;
  }

  public get<R>(url: string, reply: R | Callback<R>): Function {
    const data: any = reply instanceof Function ? reply() : reply;
    const endpoint = parse(this.host, url);
    const params = endpoint.indexOf('?') !== -1 ? endpoint.substring(endpoint.indexOf('?')) : null;

    if (params) {
      dictionary.set(params, data);
    }

    const handler = rest.get(endpoint, (req, res, ctx) => {
      if (data?.status) {
        return res(ctx.status(500), ctx.json(data));
      }

      if (params) {
        const dictionaryValue = dictionary.get(req.url.search);
        return res(ctx.status(200), ctx.json(dictionaryValue));
      }

      return res(ctx.status(200), ctx.json(data));
    });

    msw().use(handler);

    return () => {
      throw Error('Not implemented clear function');
    };
  }

  public post<R>(url: string, reply: R | Callback<R>): Function {
    const data: any = reply instanceof Function ? reply() : reply;
    const handler = rest.post(parse(this.host, url), (req, res, ctx) => {
      if (data?.status) {
        return res(ctx.status(500), ctx.json(data));
      }
      return res(ctx.status(200), ctx.json(data));
    });

    msw().use(handler);

    return () => {
      throw Error('Not implemented clear function');
    };
  }

  public put<R>(url: string, reply: R | Callback<R>): Function {
    const data: any = reply instanceof Function ? reply() : reply;
    const handler = rest.put(parse(this.host, url), (req, res, ctx) => {
      if (data?.status) {
        return res(ctx.status(500), ctx.json(data));
      }
      return res(ctx.status(200), ctx.json(data));
    });

    msw().use(handler);

    return () => {
      throw Error('Not implemented clear function');
    };
  }

  public patch<R>(url: string, reply: R | Callback<R>): Function {
    const data: any = reply instanceof Function ? reply() : reply;
    const handler = rest.patch(parse(this.host, url), (req, res, ctx) => {
      if (data?.status) {
        return res(ctx.status(500), ctx.json(data));
      }
      return res(ctx.status(200), ctx.json(data));
    });

    msw().use(handler);

    return () => {
      throw Error('Not implemented clear function');
    };
  }

  public delete<R>(url: string, reply: R | Callback<R>): Function {
    const data: any = reply instanceof Function ? reply() : reply;
    const handler = rest.delete(parse(this.host, url), (req, res, ctx) => {
      if (data?.status) {
        return res(ctx.status(500), ctx.json(data));
      }
      return res(ctx.status(200), ctx.json(data));
    });

    msw().use(handler);

    return () => {
      throw Error('Not implemented clear function');
    };
  }
}

export { MockService };
