export type TableColumns<T extends Record<string, never>> = {
  readonly [K in keyof T]?: {
    readonly title: string;
    readonly spacing?: number;
    readonly sort?: (a: T[K], b: T[K]) => number;
    readonly render?: (row: T) => JSX.Element;
  };
};
