import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Dayjs } from 'dayjs';
import {
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  PopoverHeader,
  ButtonGroup,
  Popover,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';

import { IAddAvailabilityFormValues, IAvailability } from 'modules/schedules/application/types';
import { AddAvailableEmployeesForm, useAddAvailabilitiesNotification, useRangeWeekDatesConsumer } from 'modules/schedules/presentation';
import { useAddEmployeeAvailabilities } from 'modules/schedules/infrastructure/command';
import { useFacilityContextSelector } from 'modules/context';

import { useModal } from 'hooks';
import { Button } from 'shared/Button';
import { FormattedDate } from 'shared/Date';
import { SubmitButton } from 'shared/Form';

interface IProps {
  dayDate: Dayjs;
  availabilities: IAvailability[];
  scheduleId: string;
  employeeId: string;
  index: number;
}

const FilledAvailabilityPopover = ({ availabilities, dayDate, index, scheduleId, employeeId }: IProps) => {
  const { onOpen, onClose, isOpen, data } = useModal<IAddAvailabilityFormValues[]>();
  const facilityId = useFacilityContextSelector(state => state.facilityId);
  const params = useRangeWeekDatesConsumer();

  const { showFailureNotification } = useAddAvailabilitiesNotification();
  const [add, isLoading] = useAddEmployeeAvailabilities({
    facilityId,
    scheduleId,
    employeeId,
    creatorId: employeeId,
    dayDate,
    params,
  });

  const availability = availabilities[index];

  return (
    <Popover
      isLazy
      onOpen={() =>
        onOpen(
          availabilities.map(value => ({
            startTime: value.startTime,
            endTime: value.endTime,
          })),
        )
      }
      onClose={onClose}
      isOpen={isOpen}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button w='100%' id={`availability-${index}`}>
          <FormattedDate value={availability.startTime} format='HH:mm' />
          <Text> - </Text>
          <FormattedDate value={availability.endTime} format='HH:mm' />
        </Button>
      </PopoverTrigger>
      <PopoverContent width={{ base: 320, md: 370 }} mt={12} position='absolute' transform='translate(-50%, 4px) !important'>
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
          <FormattedDate value={dayDate.toDate().toString()} format='DD MMM (dddd)' />
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          {data && (
            <AddAvailableEmployeesForm
              onSubmit={async model => {
                try {
                  await add(model.availabilities);
                  onClose();
                } catch (e) {
                  showFailureNotification();
                }
              }}
              date={availability.startTime}
              defaultValues={data}
            />
          )}
        </PopoverBody>
        <PopoverFooter d='flex' alignItems='center' justifyContent='flex-end' pb={4}>
          <ButtonGroup>
            <SubmitButton isLoading={isLoading} size='sm' form='add-available-employees-form' />
            <Button size='sm' colorScheme='gray' onClick={onClose}>
              <FormattedMessage id='close' defaultMessage='Close' />
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export { FilledAvailabilityPopover };
