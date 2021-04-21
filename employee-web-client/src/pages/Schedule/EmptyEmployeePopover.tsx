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
} from '@chakra-ui/react';

import { AddAvailableEmployeesForm, useRangeWeekDatesConsumer } from 'modules/schedules/presentation';
import { useAddAvailableEmployees } from 'modules/schedules/infrastructure/command';
import { useFacilityConsumer } from 'modules/context';
import { IAddAvailableEmployeeDto } from 'modules/schedules/application/types';

import { useModal } from 'hooks';
import { Button } from 'shared/Button';
import { FormattedDate } from 'shared/Date';
import { SubmitButton } from 'shared/Form';

interface IProps {
  date: Dayjs;
  employeeId: string;
  scheduleId: string;
  index: number;
}

const EmptyEmployeePopover = ({ date, index, employeeId, scheduleId }: IProps) => {
  const { onOpen, onClose, isOpen, data } = useModal<IAddAvailableEmployeeDto[]>();
  const { facilityId } = useFacilityConsumer();
  const params = useRangeWeekDatesConsumer();

  const [add, isLoading] = useAddAvailableEmployees(facilityId, scheduleId, params);

  return (
    <Popover
      isLazy
      onOpen={() =>
        onOpen([
          {
            startTime: '',
            endTime: '',
            employeeId,
            creatorId: employeeId,
          },
        ])
      }
      onClose={onClose}
      isOpen={isOpen}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button opacity='.6' colorScheme='gray' w='100%' h='100%' id={`availability-${index}`}>
          <FormattedMessage id='day-off' defaultMessage='Day off' />
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
              employeeId={employeeId}
              creatorId={employeeId}
              date={date.toDate().toString()}
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

export { EmptyEmployeePopover };
