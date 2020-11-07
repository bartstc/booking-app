import { ValueObject } from 'shared/domain';
import { Guard, Result, TextValidator } from 'shared/core';

import { IWorkingDay, IWorkingHours, WeekDay } from './types';

export class WorkingDay extends ValueObject<IWorkingDay> {
  get dayName() {
    return this.props.dayName;
  }

  get hours() {
    return this.props.hours;
  }

  public static validateHours(hours: IWorkingHours[]) {
    const isRange = hours.every(range => Object.values(range).length === 2);
    if (!isRange) return false;

    return hours
      .map(range => [range.until, range.to])
      .flat()
      .every(value => TextValidator.validateHour(value));
  }

  public static validateDayName(dayName: string) {
    return Object.values(WeekDay).some(day => day === dayName);
  }

  public static create(props: IWorkingDay): Result<WorkingDay> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.dayName,
        argumentName: 'workingDay.name',
      },
      {
        argument: props.hours,
        argumentName: 'workingDay.hours',
      },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail(nullGuard);
    }

    if (!this.validateDayName(props.dayName)) {
      return Result.fail({ message: 'workingDay.dayName.invalid' });
    }

    if (!this.validateHours(props.hours)) {
      return Result.fail({ message: 'workingDay.hours.invalid' });
    }

    return Result.ok(new WorkingDay(props));
  }
}
