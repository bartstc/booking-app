import { Options } from "./Options";
import { AjaxError } from "./AjaxError";

export class HttpService {
  private static defaultOptions: Options = {
    responseType: "json",
  };

  constructor(private readonly options: Options) {
    this.options = { ...HttpService.defaultOptions, ...this.options };
  }

  public get<R = unknown>(url: string, options?: Options): Promise<R> {
    return this.buildHttpMethod<R>(url, options, (opt) => ({
      method: "GET",
      headers: opt.headers,
      signal: opt.signal,
    }));
  }

  public delete<R = unknown>(url: string, options?: Options): Promise<R> {
    return this.buildHttpMethod<R>(url, options, (opt) => ({
      headers: opt.headers,
      method: "DELETE",
      signal: opt.signal,
    }));
  }

  public post<R = unknown, B = unknown>(
    url: string,
    body: B,
    options?: Options
  ) {
    return this.buildHttpMethod<R>(url, options, (opt) => ({
      headers: opt.headers,
      method: "POST",
      body: JSON.stringify(body),
      signal: opt.signal,
    }));
  }

  public put<R = unknown, B = unknown>(
    url: string,
    body?: B,
    options?: Options
  ) {
    return this.buildHttpMethod<R>(url, options, (opt) => ({
      headers: opt.headers,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      signal: opt.signal,
    }));
  }

  public patch<R = unknown, B = unknown>(
    url: string,
    body?: B,
    options?: Options
  ) {
    return this.buildHttpMethod<R>(url, options, (opt) => ({
      headers: opt.headers,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      signal: opt.signal,
    }));
  }

  private buildHttpMethod<R>(
    url: string,
    options: Options = {},
    mapOptionsToFetchOpt: (options: Options) => RequestInit
  ): Promise<R> {
    const allOptions = { ...this.options, ...options };
    // secure correct endpoint
    const endpoint = this.parseUrl(allOptions.host, url);

    return fetch(endpoint, mapOptionsToFetchOpt(allOptions)).then(
      (response) => {
        if (!response.ok) {
          return response.json().then((res) => {
            // eslint-disable-next-line no-throw-literal
            throw {
              status: response.status,
              message: response.statusText,
              name: "Ajax Error",
              response: res,
            } as AjaxError;
          });
        }
        return response[allOptions.responseType || "json"]().catch((error) =>
          error.toString() === "SyntaxError: Unexpected end of JSON input"
            ? {}
            : error
        );
      }
    );
  }

  private parseUrl(host: string | undefined, url: string) {
    if (host === undefined) {
      return url;
    }

    const parsedHost = host.charAt(host.length - 1) !== "/" ? `${host}/` : host;
    const parsedUrl = url.charAt(0) === "/" ? url.substring(1) : url;

    return `${parsedHost}${parsedUrl}`;
  }
}
