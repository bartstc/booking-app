import { WatchedList } from 'shared/domain';

import { FacilityId } from '../../facilities/domain';

export class ScopeFacilityIds extends WatchedList<FacilityId> {
  private constructor(initialIds: FacilityId[]) {
    super(initialIds);
  }

  public compareItems(a: FacilityId, b: FacilityId): boolean {
    return a.equals(b);
  }

  public static create(initialIds?: FacilityId[]): ScopeFacilityIds {
    return new ScopeFacilityIds(initialIds ?? []);
  }
}
