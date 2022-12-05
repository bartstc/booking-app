import React from 'react';
import { useIntl } from 'react-intl';

import { ListItem } from 'shared/DescriptionListV2';

import { useFacilityFormStore } from '../createFacilityFormStore';
import { CreateFacilityFormDto } from '../../../application/types';
import { CreateFacilityMapper } from '../../../application';
import { FacilityBody } from '../../FacilityBody';
import { FormStepHeader } from '../FormStepHeader';

const SummaryStep = () => {
  const { formatMessage } = useIntl();
  const data = useFacilityFormStore(store => store.data);

  return (
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
  );
};

export { SummaryStep };
