import React from 'react';
import { useIntl } from 'react-intl';
import { ButtonGroup } from '@chakra-ui/react';

import { ListItem, Divider } from 'shared/DescriptionListV2';
import { List, IndentLabel } from 'shared/IndentiationList';

import { useFacilityFormStore } from '../createFacilityFormStore';
import { CreateFacilityFormDto } from '../../../application/types';
import { CreateFacilityMapper } from '../../../application';
import { FacilityBody } from '../../FacilityBody';
import { FormStepHeader } from '../FormStepHeader';
import { PreviousStepButton } from '../PreviousStepButton';
import { SubmitButton } from '../SubmitButton';

const SummaryStep = () => {
  const { formatMessage } = useIntl();
  const data = useFacilityFormStore(store => store.data);
  const step = useFacilityFormStore(store => store.step);

  return (
    <List>
      <ListItem>
        <FacilityBody facility={CreateFacilityMapper.formToModel(data as CreateFacilityFormDto)}>
          <ListItem>
            <FormStepHeader>
              {formatMessage({
                id: 'summary-facility-step-three',
                defaultMessage: 'Step 4: Summary',
              })}
            </FormStepHeader>
          </ListItem>
        </FacilityBody>
      </ListItem>
      <Divider />
      <IndentLabel>
        <ButtonGroup>
          <PreviousStepButton formStep={step} />
          <SubmitButton />
        </ButtonGroup>
      </IndentLabel>
    </List>
  );
};

export { SummaryStep };
