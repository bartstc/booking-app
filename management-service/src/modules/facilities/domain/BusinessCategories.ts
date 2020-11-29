import { WatchedList } from 'shared/domain';

import { BusinessCategory } from './BusinessCategory';

export class BusinessCategories extends WatchedList<BusinessCategory> {
  private constructor(initialCategories: BusinessCategory[]) {
    super(initialCategories);
  }

  public compareItems(a: BusinessCategory, b: BusinessCategory): boolean {
    return a.equals(b);
  }

  public static create(
    initialCategories?: BusinessCategory[],
  ): BusinessCategories {
    return new BusinessCategories(initialCategories ?? []);
  }
}
