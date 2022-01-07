import React from 'react';
import { isMobile } from 'react-device-detect';
import {
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
  toggle(columnName: string): void;
  columnsLabels: Record<string, string>;
}

const TableConfigButton = ({ config, columnsLabels, toggle }: IProps) => {
  const { formatMessage } = useIntl();

  const ignoredLabels = ['checkbox', 'collapse', 'actions'];

  // const [dragItemIndex, setDragItemIndex] = useState<number>(0);
  // const [columns, setColumns] = useState<DragItem[]>(Object.entries(config).filter(([name]) => !ignoredLabels.includes(name)));

  if (isMobile) {
    return null;
  }

  // const handleDragStart = (index: number) => {
  //   setDragItemIndex(index);
  // };
  //
  // const handleDragEnter = (e: DragEvent<HTMLDivElement>, index: number) => {
  //   const newList = [...columns];
  //   const draggableItem = newList[dragItemIndex];
  //
  //   newList.splice(dragItemIndex, 1);
  //   newList.splice(index, 0, draggableItem);
  //   setDragItemIndex(index);
  //   setColumns(newList);
  //   // drag(index);
  // };

  const columns = Object.entries(config).filter(([name]) => !ignoredLabels.includes(name));
  const maxColumnsUnmarked = columns.filter(([, config]) => !config.isVisible).length + 1 === columns.length;

  return (
    <Popover placement='bottom-end'>
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
          <VStack as='ul' display='stretch' w='100%' align='flex-start'>
            {columns.map(([name, configItem]) => {
              const message = columnsLabels[name];

              return (
                <HStack
                  as='li'
                  spacing={3}
                  key={name}
                  // draggable
                  // onDragStart={() => handleDragStart(index)}
                  // onDragEnter={e => handleDragEnter(e, index)}
                  // onDragOver={e => e.preventDefault()}
                >
                  <HStack spacing={1}>
                    {/*<IconButton*/}
                    {/*  aria-label={formatMessage({ id: 'drag-and-drop-button', defaultMessage: 'Drag and drop button' })}*/}
                    {/*  variant='ghost'*/}
                    {/*  size='xs'*/}
                    {/*  icon={<Icon path={mdiDrag} size='18px' />}*/}
                    {/*/>*/}
                    <Checkbox
                      onChange={() => toggle(name)}
                      isChecked={configItem.isVisible}
                      isDisabled={configItem.isVisible && maxColumnsUnmarked}
                    />
                  </HStack>
                  <chakra.p fontWeight='500'>{message ?? name}</chakra.p>
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
