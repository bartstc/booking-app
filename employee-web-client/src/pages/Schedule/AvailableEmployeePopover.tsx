import React from 'react';
import { FormattedMessage } from 'react-intl';
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
  useDisclosure,
} from '@chakra-ui/react';

import { IAvailableEmployee } from 'modules/schedules/application/types';
import { AddAvailableEmployeesForm } from 'modules/schedules/presentation';

import { Button } from 'shared/Button';
import { FormattedDate } from 'shared/Date';
import { SubmitButton } from 'shared/Form';

interface IProps {
  date: string;
  availabilities: IAvailableEmployee[];
  availability: IAvailableEmployee;
  index: number;
}

const AvailableEmployeePopover = ({ availabilities, date, index, availability }: IProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover isLazy placement='right' onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
      <PopoverTrigger>
        <Button w='100%' id={`availability-${index}`}>
          <FormattedDate value={availability.startTime} format='HH:mm' />
          <Text> - </Text>
          <FormattedDate value={availability.endTime} format='HH:mm' />
        </Button>
      </PopoverTrigger>
      <PopoverContent width={{ base: 320, md: 370 }} position='absolute' transform='translate(-50%, 4px) !important'>
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
          <FormattedDate value={date} />
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <AddAvailableEmployeesForm
            onSubmit={model => {
              console.log(model);
            }}
            employeeId={availability.employeeId}
            creatorId={availability.employeeId}
            date={availability.startTime}
            defaultValues={availabilities.map(availability => ({
              creatorId: availability.employeeId,
              employeeId: availability.employeeId,
              startTime: availability.startTime,
              endTime: availability.endTime,
            }))}
          />
        </PopoverBody>
        <PopoverFooter d='flex' alignItems='center' justifyContent='flex-end' pb={4}>
          <ButtonGroup>
            <SubmitButton size='sm' form='add-available-employees-form' />
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
