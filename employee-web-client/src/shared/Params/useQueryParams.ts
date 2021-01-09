/* eslint-disable @typescript-eslint/no-explicit-any */
import { flow as pipe } from 'lodash';

import { LocationManager, LocationManagerOptions } from './LocationManager';
import { SimpleType, Value } from './utils';
import { useQueryParamsConsumer } from './QueryParamsProvider';

export type QueryParams = ReturnType<typeof useQueryParams>;

type ParamsFunction = (key: string, value: SimpleType) => void;
type RemoveFunction = (key: string, value?: SimpleType) => void;
type PickFunction = (key: string | string[]) => void;
type SetFunction<Params> = (params?: Params, options?: { shouldReplace?: boolean }) => void;
type HasFunction = (key: string, value?: SimpleType) => boolean;
type WithoutFunction = (keys: string | string[]) => void;
type GetFunction = <Val = Value>(key: string, defaultValue?: Value) => Val;
type ChangeFunction = (key: string, value: Value) => void;

const useQueryParams = <Params extends object>(options?: LocationManagerOptions) => {
  const { history, location } = useQueryParamsConsumer();

  const locationManager = LocationManager<Params>(location, options);

  const push = (shouldReplace = false) => (newUrl: string): string => {
    if (newUrl === locationManager.url) {
      return newUrl;
    }
    if (shouldReplace) {
      history.replace(newUrl);
      return newUrl;
    }
    history.push(newUrl);
    return newUrl;
  };

  const add: ParamsFunction = pipe(locationManager.add, push());

  const change: ChangeFunction = pipe(locationManager.change, push());

  const remove: RemoveFunction = pipe(locationManager.remove, push());

  const toggle: ParamsFunction = pipe(locationManager.toggle, push());

  const pick: PickFunction = pipe(locationManager.pick, push());

  const set: SetFunction<Params> = pipe(locationManager.set, push());

  const extend: SetFunction<Params> = pipe(locationManager.extend, push());

  type Option = string | number;
  type RequiredOptions = {
    limit: Option;
    offset: Option;
  };
  type Options = RequiredOptions & { total: Option };
  type BasicPages = {
    current: number;
    change: (page: number, key?: string) => void;
  };
  type Pages = BasicPages & { total: number };

  function pages(options: Options): Pages;
  function pages(options: RequiredOptions): BasicPages;
  function pages({ limit, offset, total }: any): BasicPages | Pages {
    const limitN = Number(limit);
    const offsetN = Number(offset);
    const totalN = Number(total);

    if ([limitN, offsetN].some(val => isNaN(val))) {
      throw Error(`Some value is not a number`);
    }

    if (total === undefined) {
      return {
        current: Math.floor(offsetN / limitN) + 1,
        change(page: number, key = 'offset'): void {
          change(key, String((page - 1) * limitN));
        },
      };
    }

    if (isNaN(totalN)) {
      throw Error('total is NaN');
    }

    return {
      current: Math.floor(offsetN / limitN) + 1,
      total: Math.ceil(totalN / limitN),
      change(page: number, key = 'offset'): void {
        change(key, String((page - 1) * limitN));
      },
    };
  }

  const resetPagination = (filter: string) => {
    const params: any = locationManager.params;

    if (params && params[filter]) {
      set({ ...params, limit: 10, offset: 0 } as Params);
      return;
    }

    set({ offset: 0, limit: 10 } as Params);
  };

  return {
    add,
    change,
    remove,
    toggle,
    pick,
    set,
    params: locationManager.params,
    url: locationManager.url,
    has: locationManager.has as HasFunction,
    without: locationManager.without as WithoutFunction,
    get: locationManager.get as GetFunction,
    pages,
    resetPagination,
    buildUrl: locationManager.buildUrl,
    extend,
  };
};

export { useQueryParams };
