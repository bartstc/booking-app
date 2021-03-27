import React from 'react';
import { Stack, VStack, useColorModeValue, useTheme, Flex, SimpleGrid, GridItem } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DateTimeField, InputField } from 'react-hook-form-chakra-fields';

import { Form } from 'shared/Form';
import { TreeCounter } from 'shared/TreeCounter';
import { Button } from 'shared/Button';
import { ResponsiveRemoveButton } from 'shared/Buttons';

import { useValidationSchema } from './useValidationSchema';
import { ICreateScheduleDto } from '../../../dto';
import { EmployeeSelectFieldAsync } from '../../../../employees/shared/EmployeeSelectFieldAsync';

interface IProps {
  onSubmit: (model: ICreateScheduleDto) => void;
  creatorId: string;
  facilityId: string;
  initialData?: ICreateScheduleDto;
}

const getDefaultData = (creatorId: string): ICreateScheduleDto => ({
  name: '',
  endDate: '',
  startDate: '',
  creatorId,
  availabilities: [
    {
      creatorId,
      employeeId: '',
      endTime: '',
      startTime: '',
    },
  ],
});

const CreateScheduleForm = ({ onSubmit, creatorId, facilityId, initialData }: IProps) => {
  const schema = useValidationSchema();

  return (
    <Form<ICreateScheduleDto>
      onSubmit={onSubmit}
      id='create-schedule-form'
      schema={schema}
      defaultValues={initialData ?? getDefaultData(creatorId)}
    >
      {({ register, setValue }) => {
        register('creatorId');
        setValue('creatorId', creatorId);

        return (
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
                label={<FormattedMessage id='start-date' defaultMessage='Start date' />}
                colSpan={{ base: 8, md: 6 }}
              />
              <DateTimeField
                name='endDate'
                id='end-date'
                label={<FormattedMessage id='end-date' defaultMessage='End date' />}
                colSpan={{ base: 8, md: 6 }}
              />
            </SimpleGrid>
            <AvailableEmployeesFields facilityId={facilityId} creatorId={creatorId} />
          </VStack>
        );
      }}
    </Form>
  );
};

const AvailableEmployeesFields = ({ facilityId, creatorId }: { facilityId: string; creatorId: string }) => {
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);

  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'availabilities' });

  return (
    <VStack w='100%' align='flex-start'>
      {fields.map((field, index) => {
        const isFirst = index === 0;

        return (
          <Flex key={field.id} w='100%'>
            {fields.length > 1 && <TreeCounter index={index} fieldsCount={fields.length} />}
            <VStack py={4} borderTop={`1px solid ${borderColor}`} spacing={1} w='100%' key={field.id} align='stretch'>
              <SimpleGrid columns={{ base: 10, md: 9 }} spacingX={4}>
                <EmployeeSelectFieldAsync
                  facilityId={facilityId}
                  name={`availabilities[${index}].employeeId`}
                  id={`availabilities[${index}]-employeeId`}
                  colSpan={{ base: 8, md: 7 }}
                />
                {!isFirst && (
                  <GridItem colSpan={2}>
                    <ResponsiveRemoveButton mt='32px !important' onClick={() => remove(index)} />
                  </GridItem>
                )}
              </SimpleGrid>
              <SimpleGrid columns={2} spacingX={6}>
                <DateTimeField
                  name={`availabilities[${index}].startTime`}
                  id={`availabilities[${index}]-startTime`}
                  label={<FormattedMessage id='start-time' defaultMessage='Start time' />}
                  colSpan={{ base: 2, md: 1 }}
                />
                <DateTimeField
                  name={`availabilities[${index}].endTime`}
                  id={`availabilities[${index}]-endTime`}
                  label={<FormattedMessage id='end-time' defaultMessage='End time' />}
                  colSpan={{ base: 2, md: 1 }}
                />
              </SimpleGrid>
              <Stack display='none'>
                <InputField label='' name={`availabilities[${index}].creatorId`} id={`bookedRecords[${index}].creatorId`} />
              </Stack>
            </VStack>
          </Flex>
        );
      })}
      <Button
        colorScheme='blue'
        onClick={() =>
          append({
            creatorId,
            employeeId: '',
            endTime: '',
            startTime: '',
          })
        }
      >
        <FormattedMessage id='add-another-employee' defaultMessage='Add another employee' />
      </Button>
    </VStack>
  );
};

export { CreateScheduleForm };
