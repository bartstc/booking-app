export abstract class WatchedList<T> {
  public currentItems: T[];
  private initial: T[];
  private new: T[];
  private removed: T[];

  protected constructor(initialItems?: T[]) {
    this.currentItems = initialItems ? initialItems : [];
    this.initial = initialItems ? initialItems : [];
    this.new = [];
    this.removed = [];
  }

  abstract compareItems(a: T, b: T): boolean;

  public getItems(): T[] {
    return this.currentItems;
  }

  public getNewItems(): T[] {
    return this.new;
  }

  public getRemovedItems(): T[] {
    return this.removed;
  }

  public exists(item: T): boolean {
    return this.isCurrentItem(item);
  }

  private isCurrentItem(item: T): boolean {
    return (
      this.currentItems.filter((v: T) => this.compareItems(item, v)).length !==
      0
    );
  }

  public add(item: T): void {
    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item);
    }

    if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
      this.new.push(item);
    }

    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item);
    }
  }

  private isRemovedItem(item: T): boolean {
    return (
      this.removed.filter((v: T) => this.compareItems(item, v)).length !== 0
    );
  }

  private removeFromRemoved(item: T): void {
    this.removed = this.removed.filter(v => !this.compareItems(item, v));
  }

  private wasAddedInitially(item: T): boolean {
    return (
      this.initial.filter((v: T) => this.compareItems(item, v)).length !== 0
    );
  }

  private isNewItem(item: T): boolean {
    return this.new.filter((v: T) => this.compareItems(item, v)).length !== 0;
  }

  public remove(item: T): void {
    this.removeFromCurrent(item);

    if (this.isNewItem(item)) {
      this.removeFromNew(item);
      return;
    }

    if (!this.isRemovedItem(item)) {
      this.removed.push(item);
    }
  }

  private removeFromCurrent(item: T): void {
    this.currentItems = this.currentItems.filter(
      v => !this.compareItems(item, v)
    );
  }

  private removeFromNew(item: T): void {
    this.new = this.new.filter(v => !this.compareItems(v, item));
  }
}
