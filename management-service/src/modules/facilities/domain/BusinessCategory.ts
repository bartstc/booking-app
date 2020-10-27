import { ValueObject } from 'shared/domain';
import { Guard, Result } from 'shared/core';

import { BusinessCategoryType } from './types';

interface IProps {
  value: BusinessCategoryType;
}

export class BusinessCategory extends ValueObject<IProps> {
  get value() {
    return this.props.value;
  }

  public static isValid(value: any): boolean {
    return Object.values(BusinessCategoryType).some(type => type === value);
  }

  private constructor(props: IProps) {
    super(props);
  }

  public static create(props: IProps): Result<BusinessCategory> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      'facilityName',
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail(nullGuardResult);
    }

    if (!this.isValid(props.value)) {
      return Result.fail({ message: `businessCategoryType.invalidType` });
    }

    return Result.ok(new BusinessCategory(props));
  }
}
