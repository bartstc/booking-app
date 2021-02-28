import React from 'react';

import { OfferStatus } from 'modules/offers/types';
import { useFacilityConsumer } from 'modules/context';
import { ActivateOfferIconButton } from 'modules/offers/application/activateOffer';
import { DeactivateOfferIconButton } from 'modules/offers/application/deactivateOffer';

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
