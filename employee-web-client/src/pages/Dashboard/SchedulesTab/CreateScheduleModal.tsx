import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { SubmitButton } from 'shared/Form';
import { Button } from 'shared/Button';

import { useFacilityConsumer } from 'modules/context';
import { ICreateScheduleDto } from 'modules/schedule/dto';
import { useCreateSchedule } from 'modules/schedule/infrastructure/command';
import { CreateScheduleForm, useCreateScheduleNotification } from 'modules/schedule/application/createSchedule';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  defaultData?: ICreateScheduleDto;
}

const CreateScheduleModal = ({ onClose, isOpen, defaultData }: IProps) => {
  const { facilityId } = useFacilityConsumer();

  const [create, isLoading] = useCreateSchedule(facilityId);
  const { showSuccessNotification, showFailureNotification } = useCreateScheduleNotification();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {defaultData ? (
            <FormattedMessage id='edit-existing-schedule' defaultMessage='Edit existing schedule' />
          ) : (
            <FormattedMessage id='add-new-schedule' defaultMessage='Add new schedule' />
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <CreateScheduleForm
            onSubmit={async model => {
              try {
                await create(model);
                showSuccessNotification();
              } catch (e) {
                showFailureNotification();
              } finally {
                onClose();
              }
            }}
            facilityId={facilityId}
            // todo: should be current employeeId
            creatorId={facilityId}
            initialData={defaultData}
          />
        </ModalBody>
        <ModalFooter>
          <SubmitButton isLoading={isLoading} colorScheme='green' type='submit' form='create-schedule-form' />
          <Button colorScheme='gray' ml={3} onClick={onClose}>
            <FormattedMessage id='close' defaultMessage='Close' />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { CreateScheduleModal };
