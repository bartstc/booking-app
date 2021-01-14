import { Test } from '@nestjs/testing';

import { AddCustomerHandler } from './AddCustomer.handler';
import { CustomerKeys } from '../../../CustomerKeys';

import { FacilityKeys } from '../../../../facilities/FacilityKeys';
import { AddCustomerDto } from './AddCustomer.dto';
import { AddCustomerCommand } from './AddCustomer.command';
import { AddCustomerErrors } from './AddCustomer.errors';
import { ContactType } from '../../../../../shared/domain/types';
import { CustomerRepositoryMock } from '../../../../../../fixtures/customers';
import { FacilityRepositoryMock } from '../../../../../../fixtures/facilities';

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
    birthDate: new Date(),
    address: {
      city: 'New York',
      postCode: '33-444',
      street: 'Groove Street 34',
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
