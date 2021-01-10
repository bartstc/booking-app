import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiPhone } from '@mdi/js';
import { ChakraProps, HStack, IconButton, useColorModeValue } from '@chakra-ui/react';
import Linkify from 'react-linkify';

import { Icon } from 'shared/Icon';
import { Dropdown, DropdownItem } from 'shared/Dropdown';

interface IProps extends ChakraProps {
  phone?: string;
  email?: string;
  url?: string;
}

const ActionButtons = ({ phone, email, url, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const iconColor = useColorModeValue('gray.700', 'gray.100');

  const hideMoreButton = !email && !url;

  const callToTitle = formatMessage({
    id: 'aria-label-call-employer',
    defaultMessage: 'Call to customer',
  });

  return (
    <HStack spacing={1} className='row-cell' align='center' justify='flex-end' {...props}>
      {phone && (
        <IconButton
          as='a'
          href={`tel:${phone}`}
          color='primary.500'
          aria-label={callToTitle}
          title={callToTitle}
          background='transparent'
          icon={<Icon path={mdiPhone} color={iconColor} />}
        />
      )}
      {!hideMoreButton && (
        <Dropdown>
          {email && (
            <a href={`mailto:${email}`}>
              <DropdownItem>
                <FormattedMessage id='employers-item-send-email' defaultMessage='Send email message' />
              </DropdownItem>
            </a>
          )}
          {url && (
            <DropdownItem>
              <Linkify
                componentDecorator={href => (
                  <a href={href} target={'_blank'} rel='noopener noreferrer'>
                    {formatMessage({
                      id: 'employers-item-go-to-website',
                      defaultMessage: `Go to customer's page`,
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
    </HStack>
  );
};

export { ActionButtons };
