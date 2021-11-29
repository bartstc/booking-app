import React from 'react';
import { Skeleton as ChSkeleton, SkeletonProps, VStack } from '@chakra-ui/react';

interface IProps extends SkeletonProps {}

const Skeleton = (props: IProps) => {
  return (
    <VStack w='100%'>
      {Array.from(Array(11).keys()).map(value => (
        <ChSkeleton key={value} w='100%' h='46px' {...props} />
      ))}
    </VStack>
  );
};

export { Skeleton };
