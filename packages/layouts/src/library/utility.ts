import React, { useMemo } from 'react';
import { LayoutComponent, DispatchableLayoutComponent } from './types';

export function createCtx<A>() {
  const ctx = React.createContext<A | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const; // make TypeScript infer a tuple, not an array of union types
}

export function useIdx(id?: string) {
  return useMemo(id ? () => id : idx, []);
}

export type AsyncRetComp<T extends LayoutComponent, A = {}> = (
  arg?: A
) => Promise<React.ComponentProps<T>>;
export type RetComp<T extends LayoutComponent, A = {}> = (
  arg?: A
) => React.ComponentProps<T>;

export const isFunc = (fn: any): fn is Function => {
  return {}.toString.call(fn) === '[object Function]';
};

export const isReducable = (
  component: any
): component is DispatchableLayoutComponent => !!component.propReducer;

let i = 0;
export function idx() {
  return `${i++}`;
}

export type VoidReturn<T extends { [key: string]: Function }> = {
  [K in keyof T]: (...args: ArgumentTypes<T[K]>) => void;
};

export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;
