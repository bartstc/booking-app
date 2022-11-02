import { ComponentClass, ComponentType } from 'react';

interface ComponentEnhancer<TInner, TOutter> {
  (component: ComponentType<TInner>): ComponentClass<TOutter>;
}

function compose<TInner, TOutter>(...funcs: Function[]): ComponentEnhancer<TInner, TOutter> {
  return funcs.reduce(
    (a, b) =>
      (...args: Function[]) =>
        a(b(...args)),
    (arg: unknown) => arg,
  ) as ComponentEnhancer<TInner, TOutter>;
}

export { compose };