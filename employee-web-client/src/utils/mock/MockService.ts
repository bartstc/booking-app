/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultBodyType, ResponseResolver, rest, RestContext, RestRequest } from 'msw';

import { UrlService } from '../http/UrlService';

type Callback<T> = () => T;

const { parse } = new UrlService();
const msw = () => (process.env.STORYBOOK === 'true' ? require('utils/mock/msw.browser').worker : require('utils/mock/msw.server').server);

class MockService {
  constructor(private readonly host: string) {
    this.host = host;
  }

  public get<R extends DefaultBodyType = DefaultBodyType>(
    url: string,
    reply: R | ResponseResolver<RestRequest<R>, RestContext, R>,
  ): Function {
    const handler = rest.get<R>(
      parse(this.host, url),
      reply instanceof Function
        ? (reply as any)
        : (req, res, ctx) => {
            const data: any = reply;
            if (data?.status) {
              return res(ctx.status(data.status), ctx.json(data));
            }

            return res(ctx.status(200), ctx.json(data));
          },
    );

    msw().use(handler);

    return () => {
      throw Error('Not implemented clear function');
    };
  }

  public post<R extends DefaultBodyType = DefaultBodyType>(
    url: string,
    reply: R | ResponseResolver<RestRequest<R>, RestContext, R>,
  ): Function {
    const handler = rest.post(
      parse(this.host, url),
      reply instanceof Function
        ? (reply as any)
        : (req, res, ctx) => {
            const data: any = reply;

            if (data?.status) {
              return res(ctx.status(500), ctx.json(data));
            }
            return res(ctx.status(200), ctx.json(data));
          },
    );

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
