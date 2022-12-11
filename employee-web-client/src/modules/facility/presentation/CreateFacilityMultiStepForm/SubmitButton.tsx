import React from 'react';
import { useIntl } from 'react-intl';
import { ChevronRightIcon } from '@chakra-ui/icons';

import { Button } from 'shared/Button';

import { useCreateFacility } from '../../infrastructure/command';
import { useCreateFacilityNotification } from '../FacilityForm';
import { FacilityFormStep, useFacilityFormStore } from './createFacilityFormStore';

interface IProps {
  enterpriseId: string;
  employeeId: string;
  onSuccess?: () => void;
}

const SubmitButton = ({ enterpriseId, employeeId, onSuccess }: IProps) => {
  const { formatMessage } = useIntl();

  const data = useFacilityFormStore(store => store.data);
  const [handler, isLoading] = useCreateFacility(enterpriseId, employeeId);
  const { showCreateFailureNotification, showCreateSuccessNotification } = useCreateFacilityNotification();

  return (
    <Button
      variant='solid'
      colorScheme='green'
      id={`submit-facility-form`}
      rightIcon={<ChevronRightIcon />}
      isLoading={isLoading}
      onClick={async () => {
        try {
          await handler(data);
          useFacilityFormStore.setState({ data: {}, step: FacilityFormStep.Base_info });
          showCreateSuccessNotification();
          onSuccess?.();
        } catch {
          showCreateFailureNotification();
        }
      }}
    >
      {formatMessage({ id: 'submit', defaultMessage: 'Submit' })}
    </Button>
  );
};

export { SubmitButton };
