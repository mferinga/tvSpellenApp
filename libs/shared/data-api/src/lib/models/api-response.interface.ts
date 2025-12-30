export interface IApiMetaInfo {
  version: string;
  type: 'object' | 'list' | 'none';
  count: number;
}

export interface IApiResponse<T> {
  results: T[] | T;
  info: IApiMetaInfo;
}
