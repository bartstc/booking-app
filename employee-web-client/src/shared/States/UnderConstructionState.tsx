import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { State } from './components';
import image from '../../assets/images/maintenance.png';

const UnderConstructionState = () => {
  const { formatMessage } = useIntl();

  return (
    <State
      image={image}
      alt={formatMessage({
        id: 'under-construction',
        defaultMessage: 'Under construction',
      })}
      header={<FormattedMessage id='under-construction-header' defaultMessage='Page under construction' />}
      description={<FormattedMessage id='under-construction-description' defaultMessage='It will be ready soon. Stay patient :)' />}
      mt={{ base: 20, md: 40, lg: 28 }}
    />
  );
};

export { UnderConstructionState };
