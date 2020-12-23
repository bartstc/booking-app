import { Test } from '@nestjs/testing';

import { AddCustomerHandler } from './AddCustomer.handler';
import { CustomerKeys } from '../../../CustomerKeys';
import { CustomerRepositoryMock } from '../../fixtures';

import { FacilityKeys } from '../../../../facilities/FacilityKeys';
import { FacilityRepositoryMock } from '../../../../facilities/application/fixtures';
import { AddCustomerDto } from './AddCustomer.dto';
import { AddCustomerCommand } from './AddCustomer.command';
import { AddCustomerErrors } from './AddCustomer.errors';
import { ContactType } from '../../../../../shared/domain/types';

describe('AddCustomerHandler', () => {
  let addCustomerHandler: AddCustomerHandler;
  let facilityRepository;
  let customerRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AddCustomerHandler,
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

    addCustomerHandler = await module.get(AddCustomerHandler);
    facilityRepository = await module.get(FacilityKeys.FacilityRepository);
    customerRepository = await module.get(CustomerKeys.CustomerRepository);
  });

  const addCustomerDto: AddCustomerDto = {
    fullName: 'John Doe',
    birthDate: '12-12-1994',
    address: {
      city: 'New York',
      houseNumber: '3',
      postCode: '33-444',
      street: 'Groove Str',
      flatNumber: null,
    },
    contacts: [
      {
        type: ContactType.Url,
        value: 'www.google.com',
      },
    ],
  };
  const facilityId = '123';

  it(`should return "FacilityNotFoundError" error`, async function() {
    facilityRepository.exists.mockResolvedValue(false);

    const result = await addCustomerHandler.execute(
      new AddCustomerCommand(addCustomerDto, facilityId),
    );

    expect(result.value.constructor).toBe(
      AddCustomerErrors.FacilityNotFoundError,
    );
  });

  it('should return Customer model', async function() {
    facilityRepository.exists.mockResolvedValue(true);

    const result = await addCustomerHandler.execute(
      new AddCustomerCommand(addCustomerDto, facilityId),
    );
    expect(result.value.isSuccess).toBeTruthy();
  });
});
