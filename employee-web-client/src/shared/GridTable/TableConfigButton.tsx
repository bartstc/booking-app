import React from 'react';
import { isMobile } from 'react-device-detect';
import {
  Text,
  HStack,
  chakra,
  Checkbox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { mdiCog } from '@mdi/js';
import { useIntl } from 'react-intl';

import { ITableConfig } from './ITableConfig';
import { Icon } from '../Icon';

interface IProps {
  config: ITableConfig;
  columnsLabels: Record<string, string>;
}

const TableConfigButton = ({ config, columnsLabels }: IProps) => {
  const { formatMessage } = useIntl();

  if (isMobile) {
    return null;
  }

  const ignoredLabels = ['checkbox', 'collapse', 'actions'];

  return (
    <Popover placement='bottom-start'>
      <PopoverTrigger>
        <IconButton
          aria-label={formatMessage({ id: 'table-configuration', defaultMessage: 'Table configuration' })}
          variant='ghost'
          icon={<Icon path={mdiCog} size='24px' />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader px={4}>{formatMessage({ id: 'table-configuration', defaultMessage: 'Table configuration' })}</PopoverHeader>
        <PopoverBody p={4}>
          <VStack display='stretch' w='100%' align='flex-start'>
            <Text fontWeight='600'>{formatMessage({ id: 'visible-columns', defaultMessage: 'Visible columns' })}</Text>
            {Object.entries(config)
              .filter(([name]) => !ignoredLabels.includes(name))
              .map(([name, configItem]) => {
                const message = columnsLabels[name];

                return (
                  <HStack key={name}>
                    <Checkbox isChecked={configItem.isVisible} />
                    {/* todo: translations */}
                    <chakra.p>{message ?? name}</chakra.p>
                  </HStack>
                );
              })}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export { TableConfigButton };
