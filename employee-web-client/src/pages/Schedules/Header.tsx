import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Flex, VStack, Heading, Text } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';
import { mdiFile } from '@mdi/js';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

import { CreateScheduleModal } from 'modules/schedules/presentation';
import { useFacilityConsumer } from 'modules/context';

interface IProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const Header = ({ onOpen, isOpen, onClose }: IProps) => {
  const { formatMessage } = useIntl();
  const { facilityId } = useFacilityConsumer();

  const title = formatMessage({
    id: 'add-schedule',
    defaultMessage: 'Add schedule',
  });

  return (
    <Flex w='100%' justify='space-between'>
      <VStack as='header' align='flex-start'>
        <Heading as='h1' lineHeight={8} fontWeight='900'>
          <FormattedMessage id='schedules-heading' defaultMessage='Schedules' />
        </Heading>
        <Text as='h2' lineHeight={4}>
          <FormattedMessage id='schedules-subheading' defaultMessage='Manage your schedules' />
        </Text>
      </VStack>
      <CreateScheduleModal isOpen={isOpen} onClose={onClose} creatorId={facilityId} facilityId={facilityId} />
      {isMobileOnly ? (
        <IconButton
          onClick={onOpen}
          ml={2}
          colorScheme='primary'
          variant='solid'
          title={title}
          icon={<Icon path={mdiFile} color='gray.800' />}
        />
      ) : (
        <Button onClick={onOpen} colorScheme='primary' leftIcon={<Icon path={mdiFile} />}>
          {title}
        </Button>
      )}
    </Flex>
  );
};

export { Header };
