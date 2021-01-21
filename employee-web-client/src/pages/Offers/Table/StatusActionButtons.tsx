import React from 'react';

import { OfferStatus } from 'modules/offers/types';
import { useFacilityConsumer } from 'modules/context';
import { useActivateOffer, useDeactivateOffer } from 'modules/offers/infrastructure/command';
import { ActivateOfferIconButton } from 'modules/offers/application/activateOffer';
import { DeactivateOfferIconButton } from 'modules/offers/application/deactivateOffer';

interface IProps {
  offerId: string;
  status: OfferStatus;
}

const StatusActionButtons = ({ status, offerId }: IProps) => {
  const { facilityId } = useFacilityConsumer();
  const [deactivate, isDeactivating] = useDeactivateOffer(facilityId, offerId);
  const [activate, isActivating] = useActivateOffer(facilityId, offerId);

  if (status === OfferStatus.Inactive) {
    return <ActivateOfferIconButton isLoading={isActivating} onClick={activate} />;
  }

  return <DeactivateOfferIconButton isLoading={isDeactivating} onClick={deactivate} />;
};

export { StatusActionButtons };
