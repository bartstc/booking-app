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

import { IAddAvailableEmployeeDto, IAvailableEmployee } from 'modules/schedules/application/types';
import { AddAvailableEmployeesForm, useRangeWeekDatesConsumer } from 'modules/schedules/presentation';
import { useAddAvailableEmployees } from 'modules/schedules/infrastructure/command';
import { useFacilityConsumer } from 'modules/context';

import { useModal } from 'hooks';
import { Button } from 'shared/Button';
import { FormattedDate } from 'shared/Date';
import { SubmitButton } from 'shared/Form';

interface IProps {
  date: Dayjs;
  availabilities: IAvailableEmployee[];
  scheduleId: string;
  index: number;
}

const AvailableEmployeePopover = ({ availabilities, date, index, scheduleId }: IProps) => {
  const { onOpen, onClose, isOpen, data } = useModal<IAddAvailableEmployeeDto[]>();
  const { facilityId } = useFacilityConsumer();
  const params = useRangeWeekDatesConsumer();

  const [add, isLoading] = useAddAvailableEmployees(facilityId, scheduleId, params);

  const availability = availabilities[index];

  return (
    <Popover
      isLazy
      onOpen={() =>
        onOpen(
          availabilities.map(value => ({
            creatorId: value.employeeId,
            employeeId: value.employeeId,
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
          <FormattedDate value={date.toDate().toString()} format='DD MMM (dddd)' />
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          {data && (
            <AddAvailableEmployeesForm
              onSubmit={async model => {
                try {
                  await add({ dateFrom: date.format('YYYY-MM-DDT00:00:00.000'), dateTo: date.format('YYYY-MM-DDT23:59:59.000'), ...model });
                  onClose();
                } catch (e) {
                  // todo: notification
                  console.log(e);
                }
              }}
              employeeId={availability.employeeId}
              creatorId={availability.employeeId}
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

export { AvailableEmployeePopover };
