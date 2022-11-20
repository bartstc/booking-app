import React from 'react';
import { useIntl } from 'react-intl';
import { ButtonGroup, chakra } from '@chakra-ui/react';

import { FormProvider, useForm } from 'shared/FormV2';
import { Divider, Header, Heading, ListItem, SubHeading } from 'shared/DescriptionListV2';
import { IndentLabel, IndentList, List } from 'shared/IndentiationList';

import { CreateFacilityFormDto, WeekDay } from '../../../application/types';
import { FormStepHeader } from '../FormStepHeader';
import { PreviousStepButton } from '../PreviousStepButton';
import { NextStepButton } from '../NextStepButton';
import { useFacilityFormStore } from '../createFacilityFormStore';
import { WorkingHoursInputs } from './WorkingHoursInputs';
import { AddressInputs } from './AddressInputs';

const WorkingDaysAndAddressStep = () => {
  const { formatMessage } = useIntl();
  const step = useFacilityFormStore(store => store.step);
  const data = useFacilityFormStore(store => store.data);
  const setData = useFacilityFormStore(store => store.setData);

  const methods = useForm<Partial<CreateFacilityFormDto>>({
    defaultValues: {
      ...data,
      availability:
        data.availability && data.availability?.length > 0
          ? data.availability
          : [
              {
                dayName: WeekDay.Monday,
                hours: { until: '', to: '' },
              },
            ],
    },
  });

  return (
    <chakra.form
      id='add-facility-second-step'
      data-testid='add-facility-second-step'
      noValidate
      onSubmit={methods.handleSubmit(model => setData(model))}
    >
      <FormProvider {...methods}>
        <List>
          <ListItem>
            <FormStepHeader>
              {formatMessage({
                id: 'add-facility-step-two',
                defaultMessage: 'Step 2: Working hours and address',
              })}
            </FormStepHeader>
          </ListItem>
          <IndentLabel>
            <Header>
              <Heading>
                {formatMessage({
                  id: 'working-hours',
                  defaultMessage: 'Working hours',
                })}
              </Heading>
              <SubHeading>
                {formatMessage({
                  id: 'working-hours-description',
                  defaultMessage: 'The facility opens during the week.',
                })}
              </SubHeading>
            </Header>
          </IndentLabel>
          <IndentList columns={12} spacingY={6}>
            <WorkingHoursInputs />
          </IndentList>
          <Divider />
          <IndentLabel>
            <Header>
              <Heading>
                {formatMessage({
                  id: 'address',
                  defaultMessage: 'Address',
                })}
              </Heading>
              <SubHeading>
                {formatMessage({
                  id: 'facility-address-description',
                  defaultMessage: 'The exact location of your facility.',
                })}
              </SubHeading>
            </Header>
          </IndentLabel>
          <IndentList columns={6} spacingY={6}>
            <AddressInputs />
          </IndentList>
          <Divider />
          <IndentLabel>
            <ButtonGroup>
              <PreviousStepButton formStep={step} />
              <NextStepButton formStep={step} />
            </ButtonGroup>
          </IndentLabel>
        </List>
      </FormProvider>
    </chakra.form>
  );
};

export { WorkingDaysAndAddressStep };
