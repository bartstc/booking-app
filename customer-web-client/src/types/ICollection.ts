import { IMeta } from './IMeta';

export interface ICollection<CollectionItem = unknown, Meta = IMeta> {
  collection: CollectionItem[];
  meta: Meta;
}
