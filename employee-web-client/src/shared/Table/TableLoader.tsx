import React from 'react';
import { Skeleton as ChSkeleton, SkeletonProps, VStack } from '@chakra-ui/react';

interface IProps extends SkeletonProps {}

const TableLoader = (props: IProps) => {
  return (
    <VStack w='100%'>
      <ChSkeleton w='100%' h='36px' {...props} />
      {Array.from(Array(10).keys()).map(value => (
        <ChSkeleton key={value} w='100%' h='65px' {...props} />
      ))}
      <ChSkeleton w='100%' h='45px' {...props} />
    </VStack>
  );
};

export { TableLoader };
