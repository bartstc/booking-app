import React from 'react';
import { Box, HStack, Stack, VStack, useColorModeValue, useTheme, Flex, Center } from '@chakra-ui/react';
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
      endDate: '',
      startDate: '',
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
      <VStack w='100%' align='stretch'>
        <Box maxW='450px'>
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
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);
  const countBoxColor = useColorModeValue('blue.500', 'blue.400');

  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'availabilities' });

  return (
    <VStack w='100%' align='flex-start'>
      {fields.map((field, index) => {
        const isFirst = index === 0;

        return (
          <Flex key={field.id} w='100%'>
            {fields.length > 1 && (
              <VStack spacing={3} mr={6} mt={2} mb={index === fields.length - 1 ? 8 : 0}>
                <Center backgroundColor={countBoxColor} w='25px' h='32px' borderRadius='50%' color='white' fontWeight='700' fontSize='12px'>
                  {index + 1}
                </Center>
                <Box h='100%' w='2px' backgroundColor={countBoxColor} />
              </VStack>
            )}
            <VStack pt={2} borderTop={`1px solid ${borderColor}`} spacing={0} w='100%' key={field.id} align='stretch'>
              <HStack w='100%' align='stretch' justify='space-between' spacing={4}>
                <Box w='100%' maxW='400px'>
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
              <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 0, md: 6 }} maxW='550px'>
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
