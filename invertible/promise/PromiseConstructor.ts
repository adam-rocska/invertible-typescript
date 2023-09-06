// TODO: Don't forget to jump from PromiseLike to our type
export type PromiseConstructor =
  new <T>(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void
    ) => void
  ) => PromiseLike<T>;;