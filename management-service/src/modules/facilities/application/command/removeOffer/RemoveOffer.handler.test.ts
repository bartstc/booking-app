import { Test } from '@nestjs/testing';

import { FacilityKeys } from '../../../FacilityKeys';
import {
  createFacility,
  createOffer,
  FacilityRepositoryMock,
  OfferRepositoryMock,
} from '../../../../../../fixtures/facilities';
import { ConnectionMock } from '../../../../../../fixtures';
import { UniqueEntityID } from '../../../../../shared/domain';
import { CannotRemoveActiveOfferGuard } from '../../guards';
import { RemoveOfferHandler } from './RemoveOffer.handler';
import { RemoveOfferCommand } from './RemoveOffer.command';
import { RemoveOfferErrors } from './RemoveOffer.errors';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';

describe('RemoveOfferHandler', () => {
  let removeOfferHandler: RemoveOfferHandler;
  let offerRepository;
  let facilityRepository;

  const enterpriseId = new UniqueEntityID('123');
  const facilityId = new UniqueEntityID('456');
  const offerId = new UniqueEntityID('789');

  const facility = createFacility({ facilityId, enterpriseId });
  const offer = createOffer({ facilityId, offerId });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RemoveOfferHandler,
        {
          provide: InfrastructureKeys.DbModule,
          useFactory: ConnectionMock,
        },
        {
          provide: FacilityKeys.OfferRepository,
          useFactory: OfferRepositoryMock,
        },
        {
          provide: FacilityKeys.FacilityRepository,
          useFactory: FacilityRepositoryMock,
        },
      ],
    }).compile();

    facility.addOffer(offer);
    removeOfferHandler = await module.get(RemoveOfferHandler);
    offerRepository = await module.get(FacilityKeys.OfferRepository);
    facilityRepository = await module.get(FacilityKeys.FacilityRepository);
  });

  it(`should return "FacilityNotFoundError" error`, async function () {
    facilityRepository.getFacilityById.mockRejectedValue(null);

    const result = await removeOfferHandler.execute(
      new RemoveOfferCommand(facilityId.toString(), offerId.toString()),
    );

    expect(result.value.constructor).toBe(
      RemoveOfferErrors.FacilityNotFoundError,
    );
  });

  it(`should return "OfferNotFoundError" error`, async function () {
    facilityRepository.getFacilityById.mockResolvedValue(facility);
    offerRepository.getOfferById.mockRejectedValue(null);

    const result = await removeOfferHandler.execute(
      new RemoveOfferCommand(facilityId.toString(), offerId.toString()),
    );

    expect(result.value.constructor).toBe(RemoveOfferErrors.OfferNotFoundError);
  });

  it(`should return "CannotRemoveActiveOfferGuard" error`, async function () {
    facilityRepository.getFacilityById.mockResolvedValue(facility);
    offerRepository.getOfferById.mockResolvedValue(offer);

    const result = await removeOfferHandler.execute(
      new RemoveOfferCommand(facilityId.toString(), offerId.toString()),
    );

    expect(result.value.constructor).toBe(CannotRemoveActiveOfferGuard);
  });

  it(`should successfully remove offer`, async function () {
    facilityRepository.getFacilityById.mockResolvedValue(facility);
    offerRepository.getOfferById.mockResolvedValue(offer);

    offer.deactivate();

    const result = await removeOfferHandler.execute(
      new RemoveOfferCommand(facilityId.toString(), offerId.toString()),
    );

    expect(result.value.isSuccess).toBeTruthy();
  });
});
