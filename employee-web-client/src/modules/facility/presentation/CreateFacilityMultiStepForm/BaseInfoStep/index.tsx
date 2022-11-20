import React from 'react';
import { useIntl } from 'react-intl';
import { ButtonGroup, chakra } from '@chakra-ui/react';

import { List, IndentList, IndentLabel } from 'shared/IndentiationList';
import { Header, Heading, SubHeading, Divider, ListItem } from 'shared/DescriptionListV2';
import { useForm, FormProvider } from 'shared/FormV2';

import { useFacilityFormStore } from '../createFacilityFormStore';
import { PreviousStepButton } from '../PreviousStepButton';
import { NextStepButton } from '../NextStepButton';
import { BaseInfoStepInputs } from './BaseInfoStepInputs';
import { FormStepHeader } from '../FormStepHeader';
import { CreateFacilityFormDto } from '../../../application/types';

const BaseInfoStep = () => {
  const { formatMessage } = useIntl();
  const step = useFacilityFormStore(store => store.step);
  const data = useFacilityFormStore(store => store.data);
  const setData = useFacilityFormStore(store => store.setData);

  const methods = useForm<Partial<CreateFacilityFormDto>>({
    defaultValues: data,
  });

  return (
    <chakra.form
      id='add-facility-first-step'
      data-testid='add-facility-first-step'
      noValidate
      onSubmit={methods.handleSubmit(model => setData(model))}
    >
      <FormProvider {...methods}>
        <List>
          <ListItem>
            <FormStepHeader>
              {formatMessage({
                id: 'add-facility-step-one',
                defaultMessage: "Step 1: Basic facility's data",
              })}
            </FormStepHeader>
          </ListItem>
          <IndentLabel>
            <Header>
              <Heading>
                {formatMessage({
                  id: 'facility-base-data',
                  defaultMessage: 'Base information',
                })}
              </Heading>
              <SubHeading>
                {formatMessage({
                  id: 'facility-base-data-description',
                  defaultMessage: 'Base data about facility. This fields identifies your facility in the system and on the market.',
                })}
              </SubHeading>
            </Header>
          </IndentLabel>
          <IndentList columns={6} spacingY={6}>
            <BaseInfoStepInputs />
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

export { BaseInfoStep };
