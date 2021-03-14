import React, { memo } from 'react';
import { components, OptionProps } from 'react-select';
import { HStack, VStack, Divider, Tag, TagLabel } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { SelectedOfferOption } from './index';
import { IOffer } from '../../types';

interface IProps extends OptionProps<SelectedOfferOption, false> {}

// eslint-disable-next-line react/display-name
const OfferOption = memo(
  (props: IProps) => {
    const offer: IOffer = props.data.offer;

    return (
      <components.Option {...props}>
        <VStack align='flex-start' justify='flex-start' width='100%'>
          <p>{offer.name}</p>
          <HStack>
            <strong>
              {offer.price.value} {offer.price.currency.toUpperCase()}
            </strong>
            <Tag colorScheme='green' size='sm'>
              <TagLabel isTruncated width='100%'>
                {offer.price.type.toUpperCase()}
              </TagLabel>
            </Tag>
            <Tag colorScheme='primary' size='sm'>
              <TagLabel isTruncated width='100%'>
                <FormattedMessage id='duration' defaultMessage='Duration' />
                {': '} {offer.duration} <FormattedMessage id='minutes-short' defaultMessage='Min' />
              </TagLabel>
            </Tag>
          </HStack>
          <Divider pt={2} />
        </VStack>
      </components.Option>
    );
  },
  () => false,
);

export { OfferOption };
