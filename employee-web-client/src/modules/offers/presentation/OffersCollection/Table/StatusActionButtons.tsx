import React from 'react';

import { useFacilityContextSelector } from 'modules/context';

import { OfferStatus } from '../../../application/types';
import { ActivateOfferIconButton } from '../../ActivateOfferIconButton';
import { DeactivateOfferIconButton } from '../../DeactivateOfferIconButton';

interface IProps {
  offerId: string;
  status: OfferStatus;
}

const StatusActionButtons = ({ status, offerId }: IProps) => {
  const { facilityId } = useFacilityContextSelector();

  if (status === OfferStatus.Inactive) {
    return <ActivateOfferIconButton facilityId={facilityId} offerId={offerId} />;
  }

  return <DeactivateOfferIconButton facilityId={facilityId} offerId={offerId} />;
};

export { StatusActionButtons };
