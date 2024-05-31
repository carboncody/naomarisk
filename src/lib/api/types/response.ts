export interface ActionResponse<T> {
  data?: T;
  error?: {
    code: number;
    message: string;
  };
}
