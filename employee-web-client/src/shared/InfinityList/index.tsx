import React, { ReactElement, Fragment } from 'react';
import InfiniteScroll, { Props as InfiniteScrollProps } from 'react-infinite-scroll-component';
import { HStack, Spinner, Text } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

interface IInfiniteListProps<Data> extends Partial<InfiniteScrollProps> {
  limit: number;
  data: Data[] | undefined;
  children(group: Data, index: number): ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: () => any;
  hasMore: boolean;
}

function InfinityList<Data>({ data, limit, children, next, hasMore, ...props }: IInfiniteListProps<Data>) {
  return (
    <>
      <InfiniteScroll
        loader={
          <HStack justify='center' align='center' w='100%' my={4}>
            <Text fontSize='sm'>
              <FormattedMessage id='fetching-data' defaultMessage='Fetching ...' />
            </Text>
            <Spinner size='sm' />
          </HStack>
        }
        dataLength={data?.length ?? limit}
        next={next}
        hasMore={hasMore}
        {...props}
      >
        {data?.map((group, i) => {
          return <Fragment key={i}>{children(group, i)}</Fragment>;
        })}
      </InfiniteScroll>
    </>
  );
}

export { InfinityList };
