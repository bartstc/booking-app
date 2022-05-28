export class UrlService {
  public parse(host: string | undefined, url: string) {
    if (host === undefined) {
      return url;
    }

    const parsedHost = host.charAt(host.length - 1) !== '/' ? `${host}/` : host;
    const parsedUrl = url.charAt(0) === '/' ? url.substring(1) : url;

    return `${parsedHost}${parsedUrl}`;
  }
}
