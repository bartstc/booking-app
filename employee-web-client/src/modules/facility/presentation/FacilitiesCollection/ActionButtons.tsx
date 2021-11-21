import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ButtonGroup, ButtonGroupProps } from '@chakra-ui/react';
import Linkify from 'react-linkify';
import { useHistory } from 'react-router-dom';
import { mdiClipboardArrowRightOutline } from '@mdi/js';

import { Dropdown, DropdownItem } from 'shared/Dropdown';
import { IconButton } from 'shared/Button';

interface IProps extends ButtonGroupProps {
  slug: string;
  phone?: string;
  email?: string;
  url?: string;
}

const ActionButtons = ({ slug, phone, email, url, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();

  const hideMoreButton = !email && !url && !phone;

  return (
    <ButtonGroup {...props}>
      <IconButton
        title={formatMessage({ id: 'go-to-details', defaultMessage: 'Go to details' })}
        path={mdiClipboardArrowRightOutline}
        onClick={() => push(`/dashboard/facilities/${slug}`)}
      />
      {!hideMoreButton && (
        <Dropdown>
          {phone && (
            <a href={`tel:${email}`}>
              <DropdownItem>
                <FormattedMessage id='aria-label-call-manager' defaultMessage={`Call to manager`} />
              </DropdownItem>
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`}>
              <DropdownItem>
                <FormattedMessage id='facility-item-send-email' defaultMessage='Send email to manager' />
              </DropdownItem>
            </a>
          )}
          {url && (
            <DropdownItem>
              <Linkify
                componentDecorator={href => (
                  <a href={href} target={'_blank'} rel='noopener noreferrer'>
                    {formatMessage({
                      id: 'facility-item-go-to-website',
                      defaultMessage: `Go to facility's page`,
                    })}
                  </a>
                )}
              >
                {url}
              </Linkify>
            </DropdownItem>
          )}
        </Dropdown>
      )}
    </ButtonGroup>
  );
};

export { ActionButtons };
