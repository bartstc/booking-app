import { uniq } from 'lodash';

import { WatchedList } from 'shared/domain';
import { Result } from 'shared/core';

import { WorkingDay } from './WorkingDay';
import { IWorkingDay } from './types';

export class Availability extends WatchedList<WorkingDay> {
  private constructor(initialDays: WorkingDay[]) {
    super(initialDays);
  }

  public compareItems(a: WorkingDay, b: WorkingDay): boolean {
    return a.equals(b);
  }

  public static hasDuplicates(days: IWorkingDay[]) {
    return uniq(days).length !== days.length;
  }

  public static create(initialDays?: WorkingDay[]): Result<Availability> {
    if (!!initialDays && this.hasDuplicates(initialDays)) {
      return Result.fail({ message: 'availability.workingDays.notUnique' });
    }

    return Result.ok(new Availability(initialDays));
  }
}
