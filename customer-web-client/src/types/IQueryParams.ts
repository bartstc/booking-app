export interface IQueryParams extends Record<string, string | number | undefined> {
  offset: number;
  limit: number;
  order?: string;
}
