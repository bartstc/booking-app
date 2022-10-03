/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { useFormContextSelector } from './FormProvider';
import { useConfigurationValue } from './configuration';

type Cache = Map<string, any>;

const caches = new Map<string, Cache>();

const getCaches = (id: string) => {
  const cache = caches.get(id);

  if (!cache) {
    const newCache: Cache = new Map();
    caches.set(id, newCache);
    return newCache;
  }

  return cache;
};

export const useCache = () => {
  const id = useFormContextSelector(state => state.id);
  return useMemo(() => getCaches(id), [id]);
};

export const useSave = () => {
  const setValue = useFormContextSelector(state => state.setValue);
  const cache = useCache();

  return useCallback(
    (name: string) => {
      const value = cache.get(name);

      if (!value) return;

      setValue(name, value, { shouldDirty: true });
      cache.delete(name);
    },
    [cache, setValue],
  );
};

export const useRemove = (keepValue = true) => {
  const getValues = useFormContextSelector(state => state.getValues);
  const setValue = useFormContextSelector(state => state.setValue);
  const cache = useCache();
  const unregister = useFormContextSelector(state => state.unregister);

  return useCallback(
    (name: string, defaultValue?: any) => {
      const value = getValues(name);

      if (!keepValue) unregister(name);

      if (!value) return;

      if (keepValue) {
        cache.set(name, value);
      }

      if (defaultValue !== undefined) {
        setValue(name, defaultValue);
        unregister(name);
        // uncomment after updating to v7 RHF
        // unregister(name, { keepValue: true });
        return;
      }

      unregister(name);
    },
    [cache, getValues, keepValue, setValue, unregister],
  );
};

type UseConditionOption = {
  keepValue?: boolean;
  hiddenFieldValue?: any;
};

// todo: działa poprawnie tylko, gdy "name" wskazuje na typ prosty
export const useCondition = (name: string, visibleWhen: boolean, { keepValue, hiddenFieldValue }: UseConditionOption = {}) => {
  const keepHiddenFieldValue = useConfigurationValue('keepHiddenFieldValue');
  const insert = useSave();
  const remove = useRemove(keepValue ?? keepHiddenFieldValue);

  useEffect(() => {
    if (!visibleWhen) {
      remove(name, hiddenFieldValue);
    } else {
      insert(name);
    }
  }, [visibleWhen, hiddenFieldValue, insert, name, remove]);

  return visibleWhen;
};

export const useFieldBasedCondition = <Values>(
  name: string,
  fields: {
    name: string | string[];
    condition: (values: Partial<Values>) => boolean;
    defaultValue?: any;
  },
) => {
  const control = useFormContextSelector(state => state.control);

  const values = useWatch<any>({
    control,
    // remove after updating RHF to v7
    // @ts-ignore
    name: fields.name,
  });

  return useCondition(name, fields.condition(values), {
    hiddenFieldValue: fields.defaultValue,
  });
};
