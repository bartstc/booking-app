import React from 'react';
import { VStack, SimpleGrid, Box } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { DateTimeField, InputField } from 'react-hook-form-chakra-fields';

import { Form } from 'shared/Form';

import { ICreateScheduleDto } from '../../application/types';
import { useCreateScheduleValidationSchema } from '../../application';
import dayjs from 'dayjs';

interface IProps {
  onSubmit: (model: ICreateScheduleDto) => void;
  creatorId: string;
  initialData?: ICreateScheduleDto;
}

const getDefaultData = (creatorId: string): ICreateScheduleDto => ({
  name: '',
  endDate: '',
  startDate: '',
  creatorId,
  availabilities: [],
});

const CreateScheduleForm = ({ onSubmit, creatorId, initialData }: IProps) => {
  const schema = useCreateScheduleValidationSchema();

  return (
    <Form<ICreateScheduleDto>
      onSubmit={onSubmit}
      id='create-schedule-form'
      schema={schema}
      defaultValues={initialData ?? getDefaultData(creatorId)}
    >
      <VStack w='100%' align='stretch'>
        <SimpleGrid columns={8} spacingX={4}>
          <InputField
            name='name'
            label={<FormattedMessage id='schedule-name' defaultMessage='Schedule name' />}
            id='schedule-name'
            colSpan={8}
          />
          <DateTimeField
            name='startDate'
            id='start-date'
            minDate={dayjs().add(1, 'day').toDate()}
            label={<FormattedMessage id='start-date' defaultMessage='Start date' />}
            colSpan={{ base: 8, md: 6 }}
          />
          <DateTimeField
            name='endDate'
            id='end-date'
            minDate={dayjs().add(1, 'day').toDate()}
            label={<FormattedMessage id='end-date' defaultMessage='End date' />}
            colSpan={{ base: 8, md: 6 }}
          />
        </SimpleGrid>
        <Box display='none'>
          <InputField name='creatorId' label='' id='creator-id' />
        </Box>
      </VStack>
    </Form>
  );
};

export { CreateScheduleForm };
