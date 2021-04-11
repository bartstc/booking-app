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
  useDisclosure,
} from '@chakra-ui/react';

import { AddAvailableEmployeesForm } from 'modules/schedules/presentation';

import { Button } from 'shared/Button';
import { FormattedDate } from 'shared/Date';
import { SubmitButton } from 'shared/Form';

interface IProps {
  date: string;
  employeeId: string;
  index: number;
}

const EmptyEmployeePopover = ({ date, index, employeeId }: IProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Popover isLazy placement='right' onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
      <PopoverTrigger>
        <Button opacity='.6' colorScheme='gray' w='100%' h='100%' id={`availability-${index}`}>
          <FormattedMessage id='day-off' defaultMessage='Day off' />
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
            employeeId={employeeId}
            creatorId={employeeId}
            date={date}
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

export { EmptyEmployeePopover };
