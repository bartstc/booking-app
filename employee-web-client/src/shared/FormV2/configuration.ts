/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from 'react';

import { useFormContextSelector } from './FormProvider';

export type ConfigurationSelector = (configuration: Configuration) => Partial<Configuration>;

export interface Configuration {
  size: 'sm' | 'md';
  variant: 'outline' | 'unstyled' | 'flushed' | 'filled';
  autoValidation: boolean;
  keepHiddenFieldValue?: boolean;
}

export const useConfiguration = (configuration?: Partial<Configuration>) => {
  const [store, setStore] = useState<Configuration>({
    size: configuration?.size ?? 'md',
    variant: configuration?.variant ?? 'outline',
    autoValidation: configuration?.autoValidation ?? true,
    keepHiddenFieldValue: configuration?.keepHiddenFieldValue ?? true,
  });
  const setConfiguration = useCallback((configuration: ConfigurationSelector | Partial<Configuration>) => {
    if (typeof configuration === 'function') {
      return setStore(state => {
        return { ...state, ...configuration(state) };
      });
    }

    return setStore(state => {
      return { ...state, ...configuration };
    });
  }, []);

  return useMemo(() => [store, setConfiguration] as const, [setConfiguration, store]);
};

// todo: typy do poprawy
export const useConfigurationValue = <Value = any>(name: keyof Configuration): Value => {
  return useFormContextSelector((state: any) => state.configuration[name]) as any;
};

export const useConfigurationSetter = () => {
  return useFormContextSelector((state: any) => state.setConfiguration);
};
