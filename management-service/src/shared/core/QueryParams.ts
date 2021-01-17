export interface QueryParams {
  limit?: number;
  offset?: number;
  query?: string;
  order?: string;
}

interface Meta {
  limit: number;
  offset: number;
  total: number;
}

export interface QueryListResult<T> {
  collection: T[];
  meta: Meta;
}
