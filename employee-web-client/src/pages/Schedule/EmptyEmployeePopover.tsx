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
import { useAddAvailableEmployees } from '../../modules/schedules/infrastructure/command';
import { useFacilityConsumer } from '../../modules/context';

interface IProps {
  date: string;
  employeeId: string;
  scheduleId: string;
  index: number;
}

const EmptyEmployeePopover = ({ date, index, employeeId, scheduleId }: IProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { facilityId } = useFacilityConsumer();

  const [add, isLoading] = useAddAvailableEmployees(facilityId, scheduleId);

  return (
    <Popover isLazy onOpen={onOpen} onClose={onClose} isOpen={isOpen} closeOnBlur={false}>
      <PopoverTrigger>
        <Button opacity='.6' colorScheme='gray' w='100%' h='100%' id={`availability-${index}`}>
          <FormattedMessage id='day-off' defaultMessage='Day off' />
        </Button>
      </PopoverTrigger>
      <PopoverContent width={{ base: 320, md: 370 }} mt={12} position='absolute' transform='translate(-50%, 4px) !important'>
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
          <FormattedDate value={date} />
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <AddAvailableEmployeesForm
            onSubmit={async model => {
              try {
                await add(model);
              } catch (e) {
                console.log(e);
              }
            }}
            employeeId={employeeId}
            creatorId={employeeId}
            date={date}
          />
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
