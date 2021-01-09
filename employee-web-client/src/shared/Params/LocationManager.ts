/* eslint-disable @typescript-eslint/no-explicit-any */
import * as utils from './utils';
import { parse, stringify, ParseOptions, StringifyOptions } from './queryString';
import { SimpleType, Value } from './utils';

export type LocationManagerOptions = {
  parseOptions?: ParseOptions;
  stringifyOptions?: StringifyOptions;
};

export type Location<S = any> = {
  pathname: string;
  search: string;
  state: S;
  hash: string;
  key?: string;
};

export type LocationManager = ReturnType<typeof LocationManager>;

type ParamsFunction = (key: string, value: SimpleType) => string;
type AddFunction = (key: string, value: SimpleType) => string;
type RemoveFunction = (key: string, value?: SimpleType) => string;
type HasFunction = (key: string, value?: SimpleType) => boolean;
type PickFunction = (keys: string | string[]) => string;
type SetFunction<Params> = (params?: Params) => string;
type WithoutFunction = (keys: string | string[]) => string;
type GetFunction = (key: string, defaultValue?: any) => any;
type ChangeFunction = (key: string, value: Value) => string;

export const LocationManager = <Params extends object>(location: Location, options?: LocationManagerOptions) => {
  const { pathname, search } = location;
  const params = parse<Params>(search, options?.parseOptions);
  const stringifyParams = stringify(pathname, options?.stringifyOptions);
  const url = stringifyParams(params);

  const add: AddFunction = (key, value) => {
    return stringifyParams(utils.add(key, value)(params));
  };

  const remove: RemoveFunction = (key, value) => {
    return stringifyParams(utils.remove(key, value)(params));
  };

  const toggle: ParamsFunction = (key, value) => {
    return stringifyParams(utils.toggle(key, value)(params));
  };

  const extend: SetFunction<Params> = newParams => {
    return stringifyParams({ ...params, ...newParams }) as any;
  };

  const set: SetFunction<Params> = params => {
    return stringifyParams(params) as any;
  };

  const pick: PickFunction = keys => {
    return stringifyParams(utils.pick(keys)(params));
  };

  const without: WithoutFunction = keys => {
    return stringifyParams(utils.without(keys)(params));
  };

  const change: ChangeFunction = (key, value): string => {
    return extend({ ...params, [key]: value });
  };

  const get: GetFunction = utils.get(params);

  const buildUrl = (host?: string, options?: StringifyOptions) => {
    if (host === undefined) {
      return url;
    }

    const parsedHost = host.charAt(host.length - 1) === '/' ? `${host.substring(0, host.length - 1)}` : host;

    const parsedSearch = stringify('', {
      arrayFormatSeparator: ',',
      ...options,
    })(params);

    return `${parsedHost}${parsedSearch}`;
  };

  return {
    params,
    url,
    add,
    change,
    remove,
    toggle,
    set,
    pick,
    without,
    has: utils.has(params) as HasFunction,
    get,
    buildUrl,
    extend,
  };
};
