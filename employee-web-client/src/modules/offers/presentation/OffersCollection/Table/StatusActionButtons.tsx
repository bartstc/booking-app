import React from 'react';

import { useFacilityConsumer } from 'modules/context';

import { OfferStatus } from '../../../application/types';
import { ActivateOfferIconButton } from '../../components/ActivateOfferIconButton';
import { DeactivateOfferIconButton } from '../../components/DeactivateOfferIconButton';

interface IProps {
  offerId: string;
  status: OfferStatus;
}

const StatusActionButtons = ({ status, offerId }: IProps) => {
  const { facilityId } = useFacilityConsumer();

  if (status === OfferStatus.Inactive) {
    return <ActivateOfferIconButton facilityId={facilityId} offerId={offerId} />;
  }

  return <DeactivateOfferIconButton facilityId={facilityId} offerId={offerId} />;
};

export { StatusActionButtons };
