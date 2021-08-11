export type DeepNullable<T> = {
  [P in keyof T]: T[P] extends string | boolean | number | undefined ? T[P] | null : DeepNullable<T[P]>;
};
