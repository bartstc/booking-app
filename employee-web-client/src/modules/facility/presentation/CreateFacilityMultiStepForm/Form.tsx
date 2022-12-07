import React, { ReactNode } from 'react';
import { chakra } from '@chakra-ui/react';

import { useFormContextSelector } from 'shared/FormV2';

import { useFacilityFormStore } from './createFacilityFormStore';

interface IProps {
  id: string;
  children: ReactNode;
}

const Form = ({ id, children }: IProps) => {
  const setData = useFacilityFormStore(store => store.setData);
  const next = useFacilityFormStore(store => store.next);
  const handleSubmit = useFormContextSelector(state => state.handleSubmit);
  const getValues = useFormContextSelector(state => state.getValues);

  return (
    <chakra.form
      id={id}
      data-testid={id}
      noValidate
      onSubmit={handleSubmit(
        model => {
          setData(model);
          next();
        },
        () => {
          setData(getValues());
        },
      )}
    >
      {children}
    </chakra.form>
  );
};

export { Form };
