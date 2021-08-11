import { get as lodashGet, omit, uniq, pick as lodashPick } from 'lodash';

export type SimpleType = string | number | boolean;
export type Value = SimpleType | SimpleType[];

export const add = <Value extends SimpleType>(path: string, value: Value) => <Object = object>(object: Object): Object => {
  const result = lodashGet(object, path);

  if (result?.toString()) {
    if (Array.isArray(result)) {
      return {
        ...object,
        [path]: uniq([...result, value]).sort(),
      };
    }

    if (value === result) {
      return object;
    }

    return {
      ...object,
      [path]: [result, value].sort(),
    };
  }

  return {
    ...object,
    [path]: value,
  };
};

export const remove = <Value extends SimpleType>(path: string, value?: Value) => <Object = object>(object: Object): Object => {
  if (value !== undefined) {
    const result = lodashGet(object, path);

    if (Array.isArray(result)) {
      const filteredResult = result.filter(res => res !== value);

      if (filteredResult.length === 1) {
        return {
          ...object,
          [path]: filteredResult[0],
        };
      }

      return {
        ...object,
        [path]: filteredResult,
      };
    }

    if (value !== result) {
      return object;
    }
  }

  return omit<{}>(object, path) as Object;
};

export const has = <Object = object>(object: Object) => <Value extends SimpleType>(path: string, value?: Value): boolean => {
  const result = lodashGet(object, path);

  if (value !== undefined) {
    if (Array.isArray(result)) {
      return result.some(res => res === value);
    }

    return result === value;
  }

  return !!result;
};

export const toggle = <Value extends SimpleType>(path: string, value?: Value) => <Object = object>(object: Object): Object => {
  if (has<Object>(object)<Value>(path, value)) {
    return remove<Value>(path, value)<Object>(object);
  }
  return add<Value>(path, value!)<Object>(object);
};

export const isEmpty = () => (object: object): boolean => Object.keys(object).length === 0;

export const without = (paths: string | string[]) => <Object = object>(object: Object): Partial<Object> => {
  return omit(object as {}, paths);
};

export const pick = (keys: string | string[]) => <Object = object>(object: Object): Partial<Object> => {
  const result = lodashPick(object, keys);
  if (Object.keys(result).length === 0) {
    return object;
  }
  return result;
};

export const get = <Object = object>(object: Object) => <Val extends Value>(path: string, defaultValue?: Val): Value => {
  return lodashGet(object, path, defaultValue);
};
