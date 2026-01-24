export interface IListResponse {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IListParams {
  page: number;
  limit: number;
  search: string;
}

export type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
