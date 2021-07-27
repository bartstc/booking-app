import { Result } from 'shared/core';
import { Link, UniqueEntityID, ContactPerson } from 'shared/domain';

import { Enterprise, EnterpriseDescription, EnterpriseName } from '../domain';
import { BuildEnterpriseDto } from './BuildEnterprise.dto';
import { OwnerId } from '../domain/OwnerId';

export class EnterpriseMap {
  public static dtoToDomain<T extends BuildEnterpriseDto>(
    dto: T,
    ownerId: string,
    enterpriseId?: string,
  ): Result<Enterprise> {
    const name = EnterpriseName.create({ value: dto.enterpriseName });
    const description = EnterpriseDescription.create({
      value: dto.enterpriseDescription,
    });
    const url = Link.create({ value: dto.enterpriseUrl });
    const contactPerson = ContactPerson.create(dto.contactPerson);

    return Enterprise.create(
      {
        enterpriseName: name.getValue(),
        enterpriseDescription: description.getValue(),
        enterpriseUrl: url.getValue(),
        contactPerson: contactPerson.getValue(),
        ownerId: OwnerId.create(new UniqueEntityID(ownerId)).getValue(),
      },
      new UniqueEntityID(enterpriseId),
    );
  }

  public static entityToDomain(entity: any): Enterprise {
    const name = EnterpriseName.create({ value: entity.details.name });
    const description = EnterpriseDescription.create({
      value: entity.details.description,
    });
    const url = Link.create({ value: entity.details.url });
    const contactPerson = ContactPerson.create(entity.details.contactPerson);

    const enterpriseOrError = Enterprise.create(
      {
        enterpriseName: name.getValue(),
        enterpriseDescription: description.getValue(),
        enterpriseUrl: url.getValue(),
        contactPerson: contactPerson.getValue(),
        ownerId: OwnerId.create(new UniqueEntityID(entity.owner_id)).getValue(),
      },
      new UniqueEntityID(entity.enterprise_id),
    );

    if (!enterpriseOrError.isSuccess) {
      console.log(enterpriseOrError.error);
    }

    return enterpriseOrError.getValue();
  }

  public static toPersistence(enterprise: Enterprise): Partial<any> {
    return {
      enterprise_id: enterprise.enterpriseId.id.toString(),
      owner_id: enterprise.ownerId.id.toString(),
      details: {
        name: enterprise.enterpriseName.value,
        description: enterprise.enterpriseDescription.value,
        url: enterprise.enterpriseUrl.value,
        contactPerson: enterprise.contactPerson.allContacts,
      },
    };
  }
}
