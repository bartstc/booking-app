import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import {
  BusinessCategoryDegreeType,
  BusinessCategoryType,
  IBusinessCategory,
} from './types';

export class BusinessCategory extends ValueObject<IBusinessCategory> {
  get type() {
    return this.props.type;
  }

  get degree() {
    return this.props.degree;
  }

  public static isCategoryValid(value: any): boolean {
    return Object.values(BusinessCategoryType).some(type => type === value);
  }

  public static isDegreeValid(value: any): boolean {
    return Object.values(BusinessCategoryDegreeType).some(
      degree => degree === value,
    );
  }

  public static create(props: IBusinessCategory): Result<BusinessCategory> {
    const nullGuardResult = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.type,
        argumentName: 'businessCategory.type',
      },
      {
        argument: props.degree,
        argumentName: 'businessCategory.degree',
      },
    ]);

    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    if (!this.isCategoryValid(props.type)) {
      return Result.fail({ message: `businessCategory.type.invalid` });
    }

    if (!this.isDegreeValid(props.degree)) {
      return Result.fail({ message: `businessCategory.degree.invalid` });
    }

    return Result.ok(new BusinessCategory(props));
  }
}
