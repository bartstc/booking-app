import { get } from 'lodash';

import { useFormContextSelector } from '../FormProvider';

export const useErrorMessage = (name: string) => {
  return useFormContextSelector<string>(state => get(state.formState.errors, `${name}.message`));
};
