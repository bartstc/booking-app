import React from 'react';
import { Box, HStack, Stack, VStack } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { mdiDelete } from '@mdi/js';

import { DateTimeField, Form, InputField } from 'shared/Form';
import { Button, IconButton } from 'shared/Button';

import { useValidationSchema } from './useValidationSchema';
import { ICreateScheduleDto } from '../../../dto';
import { EmployeeSelectFieldAsync } from '../../../../employees/shared/EmployeeSelectFieldAsync';

interface IProps {
  onSubmit: (model: ICreateScheduleDto) => void;
  creatorId: string;
  facilityId: string;
}

const CreateScheduleForm = ({ onSubmit, creatorId, facilityId }: IProps) => {
  const schema = useValidationSchema();

  return (
    <Form<ICreateScheduleDto>
      onSubmit={onSubmit}
      id='create-schedule-form'
      schema={schema}
      defaultValues={{
        name: '',
        endDate: '',
        startDate: '',
        creatorId,
        availabilities: [
          {
            creatorId,
            employeeId: '',
            endDate: '',
            startDate: '',
          },
        ],
      }}
    >
      <VStack w='100%' align='stretch'>
        <Box maxW='500px'>
          <InputField name='name' label={<FormattedMessage id='schedule-name' defaultMessage='Schedule name' />} id='schedule-name' />
          <DateTimeField name='startDate' id='start-date' label={<FormattedMessage id='start-date' defaultMessage='Start date' />} />
          <DateTimeField name='endDate' id='end-date' label={<FormattedMessage id='end-date' defaultMessage='End date' />} />
        </Box>
        <AvailableEmployeesFields facilityId={facilityId} creatorId={creatorId} />
      </VStack>
    </Form>
  );
};

const AvailableEmployeesFields = ({ facilityId, creatorId }: { facilityId: string; creatorId: string }) => {
  const { formatMessage } = useIntl();
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'availabilities' });

  return (
    <VStack w='100%' align='flex-start'>
      {fields.map((field, index) => {
        const isFirst = index === 0;

        return (
          <Stack spacing={4} w='100%' key={field.id} direction={{ base: 'column', md: 'row' }} align='stretch'>
            <HStack w='100%' align='stretch' justify='space-between' spacing={4}>
              <Box maxW='400px'>
                <EmployeeSelectFieldAsync
                  facilityId={facilityId}
                  name={`availabilities[${index}].employeeId`}
                  id={`availabilities[${index}]-employeeId`}
                />
              </Box>
              {!isFirst && (
                <IconButton
                  title={formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
                  colorScheme='red'
                  path={mdiDelete}
                  onClick={() => remove(index)}
                  mt='32px !important'
                />
              )}
            </HStack>
            <Box maxW='500px'>
              <DateTimeField
                name={`availabilities[${index}].startDate`}
                id={`availabilities[${index}]-startDate`}
                label={<FormattedMessage id='start-date' defaultMessage='Start date' />}
              />
              <DateTimeField
                name={`availabilities[${index}].endDate`}
                id={`availabilities[${index}]-endDate`}
                label={<FormattedMessage id='end-date' defaultMessage='End date' />}
              />
            </Box>
          </Stack>
        );
      })}
      <Button
        colorScheme='blue'
        onClick={() =>
          append({
            creatorId,
            employeeId: '',
            endDate: '',
            startDate: '',
          })
        }
      >
        <FormattedMessage id='add-another-employee' defaultMessage='Add another employee' />
      </Button>
    </VStack>
  );
};

export { CreateScheduleForm };
