import React from 'react';
import { Skeleton, SkeletonProps, VStack } from '@chakra-ui/react';

interface IProps extends SkeletonProps {}

const TableLoader = (props: IProps) => {
  return (
    <VStack w='100%'>
      <Skeleton w='100%' h='36px' {...props} />
      {Array.from(Array(10).keys()).map(value => (
        <Skeleton key={value} w='100%' h='53px' {...props} />
      ))}
      <Skeleton w='100%' h='45px' {...props} />
    </VStack>
  );
};

export { TableLoader };
