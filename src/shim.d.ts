declare module 'miniprogram-api-promise' {
  type ParamType<T> = T extends (option: infer P) => any ? P : T;
  type SuccessCallback<T> = NonNullable<NonNullable<ParamType<T>>['success']>;
  type ResultType<T> = ParamType<SuccessCallback<T>>;

  type Wx = WechatMiniprogram.Wx;

  type WxAsyncFunctionKeys = {
    [K in keyof Wx]: NonNullable<ParamType<Wx[K]>> extends { success?: any }
      ? K
      : never;
  }[keyof Wx];

  type Wxp = {
    [P in WxAsyncFunctionKeys]: (
      option: ParamType<Wx[P]> = {},
    ) => Promise<ResultType<Wx[P]>>;
  };

  export declare function promisify<Func>(
    func: Func,
  ): (option: ParamType<Func> = {}) => Promise<ResultType<Func>>;
  export declare function promisifyAll(wx: Wx, wxp: Wxp): void;
}

declare module 'miniprogram-computed';
