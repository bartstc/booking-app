import { DeepPartial } from './fixture';

type MockFn<R> = (response: R) => Function;

export function mockResponseFactory<S>(defaultData: S, mockFn: MockFn<S>) {
  return (response: DeepPartial<S> = {}): S => {
    const resp: S = {
      ...defaultData,
      ...response,
    };

    mockFn(resp);
    return resp;
  };
}
