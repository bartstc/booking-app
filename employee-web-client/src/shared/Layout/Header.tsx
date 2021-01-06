import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { mdiMenu } from '@mdi/js';
import { useIntl } from 'react-intl';

import { Icon } from '../Icon';
import { IconButton } from '../Button';

interface IProps {
  toggle: () => void;
}

const Header = ({ toggle }: IProps) => {
  const { formatMessage } = useIntl();

  return (
    <HStack width='100%' position='fixed' height='50px' px={4} top={0} left={0} right={0} justify='space-between'>
      <Text fontWeight='700' color='primary.500'>
        Booking App
      </Text>
      <IconButton
        onClick={toggle}
        title={formatMessage({ id: 'open-menu', defaultMessage: 'Open menu' })}
        icon={<Icon path={mdiMenu} size='26px' />}
        size='sm'
        withoutTooltip
      />
    </HStack>
  );
};

export { Header };
