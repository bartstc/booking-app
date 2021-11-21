import React from 'react';
import { useIntl } from 'react-intl';
import { HStack, Text, ChakraProps, useColorModeValue } from '@chakra-ui/react';

import { IMeta } from 'types';

import { Pagination } from '../Pagination';

interface IProps extends ChakraProps {
  meta: IMeta;
  collectionCount: number;
}

const GridFooter = ({ meta, collectionCount, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const color = useColorModeValue('gray.600', 'gray.400');

  const endCount =
    Number(meta.limit) === collectionCount ? Number(meta.offset) + Number(meta.limit) : Number(meta.offset) + collectionCount;

  return (
    <HStack pt={2} w='100%' justify='space-between' {...props}>
      <Text color={color} fontSize='sm'>
        {formatMessage(
          { id: 'table-meta-summary', defaultMessage: '{offset} of {total} results' },
          {
            offset: `${Number(meta.offset) + 1} - ${endCount}`,
            total: meta.total,
          },
        )}
      </Text>
      <Pagination limit={meta.limit} total={meta.total} />
    </HStack>
  );
};

export { GridFooter };
