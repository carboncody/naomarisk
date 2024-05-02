// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableColumns<T extends Record<string, any>> = {
  readonly [K in keyof T]?: {
    readonly title: string;
    readonly spacing?: number;
    readonly sort?: (a: T[K], b: T[K]) => number;
    readonly render?: (row: T) => JSX.Element;
  };
};
