import { differenceWith, includes, isEqual, unionWith } from 'lodash';
import create from 'zustand';

export type ICollectionStore<Item> = {
  items: Item[];
  includes(item: Item): boolean;
  add(items: Item | Item[]): void;
  remove(items: Item | Item[]): void;
  clear(): void;
  compare(value: Item, other: Item): boolean;
};

export function createCollectionStore<Item>(store?: Partial<ICollectionStore<Item>>) {
  return create<ICollectionStore<Item>>((set, get) => ({
    items: [],
    includes: (item: Item) => includes<Item>(get().items, item),
    add: (items: Item[] | Item) => {
      if (!Array.isArray(items)) {
        items = [items];
      }

      set(state => ({
        items: unionWith<Item>(state.items, items as Item[], get().compare),
      }));
    },
    remove: (items: Item[] | Item) => {
      if (!Array.isArray(items)) {
        items = [items];
      }

      set(state => ({
        items: differenceWith<Item, Item>(state.items, items as Item[], get().compare),
      }));
    },
    clear() {
      set(() => ({ items: [] }));
    },
    compare(value: Item, other: Item) {
      return isEqual(value, other);
    },
    ...store,
  }));
}
