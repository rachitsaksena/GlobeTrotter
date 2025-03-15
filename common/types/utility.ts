export type StrictPick<T, Keys extends keyof T> = {
  [key in Keys]: T[key];
} & {
  [key in Exclude<keyof T, Keys>]?: never;
};
