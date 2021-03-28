import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { BoxProps, Box } from '@chakra-ui/react';
import Linkify from 'react-linkify';

import { Dropdown, DropdownItem } from 'shared/Dropdown';

interface IProps extends BoxProps {
  phone?: string;
  email?: string;
  url?: string;
}

const ContactMenu = ({ phone, email, url, ...props }: IProps) => {
  const { formatMessage } = useIntl();

  const hideMoreButton = !email && !url && !phone;

  return (
    <Box {...props}>
      {!hideMoreButton && (
        <Dropdown>
          {phone && (
            <a href={`tel:${phone}`}>
              <DropdownItem>
                <FormattedMessage id='aria-label-call-employer' defaultMessage={`Call to facility's manager`} />
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
    </Box>
  );
};

export { ContactMenu };
