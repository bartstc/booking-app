import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Text,
  VStack,
  Box,
  Divider,
} from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';

import { ClearFiltersButton, RadioFilterGroup } from 'shared/Filters';
import { Button } from 'shared/Button';

import { OfferStatus, PriceModel } from 'modules/offers/types';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const FiltersModal = ({ isOpen, onClose }: IProps) => {
  const { formatMessage } = useIntl();

  const statusLabels = {
    [OfferStatus.Active]: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    [OfferStatus.Inactive]: formatMessage({ id: 'inactive', defaultMessage: 'Inactive' }),
  };

  const priceTypeLabels = {
    [PriceModel.Free]: formatMessage({ id: 'price-model-free', defaultMessage: 'Free' }),
    [PriceModel.Constant]: formatMessage({ id: 'price-model-constant', defaultMessage: 'Constant' }),
    [PriceModel.Until]: formatMessage({ id: 'price-model-Until', defaultMessage: 'Until' }),
    [PriceModel.Variable]: formatMessage({ id: 'price-model-variable', defaultMessage: 'Variable' }),
  };

  const statusOptions = Object.values(OfferStatus).map(status => ({ value: status, label: statusLabels[status] }));
  const priceModelOptions = Object.values(PriceModel).map(model => ({ value: model, label: priceTypeLabels[model] }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <FormattedMessage id='more-filters' defaultMessage='More filters' />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as={VStack} align='flex-start'>
          <Box mb={4} w='100%'>
            <Text fontWeight='700' mb='.8rem'>
              <FormattedMessage id='offer-status' defaultMessage='Offer status' />
            </Text>
            <RadioFilterGroup filterName='status' options={statusOptions} />
            <Divider mt='1.2rem' />
          </Box>
          <Box mb={4} w='100%'>
            <Text fontWeight='700' mb='.8rem'>
              <FormattedMessage id='offer-price-model' defaultMessage='Price type' />
            </Text>
            <RadioFilterGroup filterName='priceType' options={priceModelOptions} />
            <Divider mt='1.2rem' />
          </Box>
        </ModalBody>
        <ModalFooter>
          <ClearFiltersButton colorScheme='gray' />
          <Button colorScheme='gray' ml={3} onClick={onClose}>
            <FormattedMessage id='close' defaultMessage='Close' />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { FiltersModal };
