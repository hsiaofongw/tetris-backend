export type ErrorInfo = {
  statusCode?: number;
  message?: string;
  errorCode?: string;
  errorUri?: string;
};

export type QueryResult<T> = {
  error?: ErrorInfo;
  result: T;
};

export type PostResult = {
  error?: any;
  receipt?: any;
};
