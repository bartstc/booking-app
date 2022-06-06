import { createFixture } from './fixture';
import { IMeta } from '../../types';

export const MetaFixture = createFixture<IMeta>({
  limit: 10,
  offset: 0,
  total: 0,
});
