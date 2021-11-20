import React, { ReactNode } from 'react';
import { Box, HStack, chakra, useColorModeValue, ChakraProps } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiCheckOutline } from '@mdi/js';
import { isMobile } from 'react-device-detect';

import { Icon } from '../Icon';
import { IconButton } from '../Button';
import { proTipStore, ProTipType } from './proTipStore';

interface IProps extends ChakraProps {
  children: ReactNode | string;
  tipName: ProTipType;
}

const ProTip = ({ children, tipName, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const color = useColorModeValue('gray.600', 'gray.400');
  const [isOn, toggle] = proTipStore(state => [state.tips[tipName], state.toggle]);

  if (isMobile) {
    return null;
  }

  if (!isOn) {
    return null;
  }

  return (
    <HStack spacing={1} align='center' {...props}>
      <Box pb='4px'>
        <IconButton
          size='xs'
          title={formatMessage({ id: 'got-it', defaultMessage: 'Got it' })}
          icon={<Icon path={mdiCheckOutline} color={color} size='16px' />}
          onClick={() => toggle(tipName)}
        />
      </Box>
      <Box color={color} fontSize='sm' fontWeight='600'>
        <FormattedMessage
          id='profession-advice'
          defaultMessage='Pro tip: {advice}.'
          values={{
            advice: <chakra.span fontWeight='300'>{children}</chakra.span>,
          }}
        />
      </Box>
    </HStack>
  );
};

export { ProTip };
