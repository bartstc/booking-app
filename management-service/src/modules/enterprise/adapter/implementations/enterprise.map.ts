import { Mapper } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import {
  ContactPerson,
  CountryCode,
  Enterprise,
  EnterpriseDescription,
  EnterpriseName,
  Link,
} from '../../domain';
import { EnterpriseDto } from '../../application/dtos';
import { EnterpriseEntity } from '../../infra/entities';

export class EnterpriseMap implements Mapper<Enterprise> {
  public static modelToDto(enterprise: Enterprise): EnterpriseDto {
    return {
      enterpriseId: enterprise.enterpriseId.id.toString(),
      enterpriseName: enterprise.enterpriseName.value,
      enterpriseDescription: enterprise.enterpriseDescription.value,
      enterpriseUrl: enterprise.enterpriseUrl.value,
      countryCode: enterprise.countryCode.value,
      contactPerson: enterprise.contactPerson.allContacts,
      createdAt: enterprise.createdAt,
      updatedAt: enterprise.updatedAt,
    };
  }

  public static rawToDto(enterprise: EnterpriseEntity): EnterpriseDto {
    return {
      enterpriseId: enterprise.enterprise_id,
      enterpriseName: enterprise.details.name,
      enterpriseDescription: enterprise.details.description,
      enterpriseUrl: enterprise.details.url,
      countryCode: enterprise.details.countryCode,
      contactPerson: enterprise.details.contactPerson,
      createdAt: enterprise.createdAt,
      updatedAt: enterprise.updatedAt,
    };
  }

  public static toDomain(entity: EnterpriseEntity): Enterprise {
    const name = EnterpriseName.create({ value: entity.details.name });
    const description = EnterpriseDescription.create({
      value: entity.details.description,
    });
    const url = Link.create({ value: entity.details.url });
    const countryCode = CountryCode.create({
      value: entity.details.countryCode,
    });
    const contactPerson = ContactPerson.create({
      ...entity.details.contactPerson,
    });

    const enterpriseOrError = Enterprise.create(
      {
        enterpriseName: name.getValue(),
        enterpriseDescription: description.getValue(),
        enterpriseUrl: url.getValue(),
        countryCode: countryCode.getValue(),
        contactPerson: contactPerson.getValue(),
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
      new UniqueEntityID(entity.enterprise_id),
    );

    if (!enterpriseOrError.isSuccess) {
      console.log(enterpriseOrError.error);
    }

    return enterpriseOrError.getValue();
  }

  public static toPersistence(
    enterprise: Enterprise,
  ): Partial<EnterpriseEntity> {
    return {
      enterprise_id: enterprise.enterpriseId.id.toString(),
      details: {
        name: enterprise.enterpriseName.value,
        description: enterprise.enterpriseDescription.value,
        url: enterprise.enterpriseUrl.value,
        countryCode: enterprise.countryCode.value,
        contactPerson: enterprise.contactPerson.allContacts,
      },
    };
  }
}
