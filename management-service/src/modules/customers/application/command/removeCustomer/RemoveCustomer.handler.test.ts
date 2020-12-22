import { Test } from '@nestjs/testing';

import { RemoveCustomerHandler } from './RemoveCustomer.handler';
import { CustomerKeys } from '../../../CustomerKeys';
import { CustomerRepositoryMock } from '../../fixtures';
import { RemoveCustomerCommand } from './RemoveCustomer.command';
import { RemoveCustomerErrors } from './RemoveCustomer.errors';

import { FacilityKeys } from '../../../../facilities/FacilityKeys';
import { FacilityRepositoryMock } from '../../../../facilities/application/fixtures';

describe('RemoveCustomerHandler', () => {
  let removeCustomerHandler: RemoveCustomerHandler;
  let customerRepository;
  let facilityRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RemoveCustomerHandler,
        {
          provide: CustomerKeys.CustomerRepository,
          useFactory: CustomerRepositoryMock,
        },
        {
          provide: FacilityKeys.FacilityRepository,
          useFactory: FacilityRepositoryMock,
        },
      ],
    }).compile();

    removeCustomerHandler = await module.get(RemoveCustomerHandler);
    customerRepository = await module.get(CustomerKeys.CustomerRepository);
    facilityRepository = await module.get(FacilityKeys.FacilityRepository);
  });

  const facilityId = '123';
  const customerId = '456';

  it(`should return "FacilityNotFoundError" error`, async function() {
    facilityRepository.exists.mockResolvedValue(false);

    const result = await removeCustomerHandler.execute(
      new RemoveCustomerCommand(facilityId, customerId),
    );

    expect(result.value.constructor).toBe(
      RemoveCustomerErrors.FacilityNotFoundError,
    );
  });

  it(`should return "CustomerNotFoundError" error`, async function() {
    facilityRepository.exists.mockResolvedValue(true);
    customerRepository.exists.mockResolvedValue(false);

    const result = await removeCustomerHandler.execute(
      new RemoveCustomerCommand(facilityId, customerId),
    );

    expect(result.value.constructor).toBe(
      RemoveCustomerErrors.CustomerNotFoundError,
    );
  });

  it('should successfully remove customer', async function() {
    facilityRepository.exists.mockResolvedValue(true);
    customerRepository.exists.mockResolvedValue(true);

    const result = await removeCustomerHandler.execute(
      new RemoveCustomerCommand(facilityId, customerId),
    );

    expect(result.value.isSuccess).toBeTruthy();
  });
});
