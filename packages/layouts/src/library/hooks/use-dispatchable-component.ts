import { useEffect, useCallback } from 'react';
import {
  LayoutComponent,
  DispatchableLayoutActionTypes,
  PropsFunc,
} from '../types';
import { useIdx, isFunc, isReducable } from '../utility';
import { useRegistry } from '../context';

export const useDispatchableComponent = <
  T extends LayoutComponent,
  Actions extends DispatchableLayoutActionTypes<T>
>(
  component: T,
  initialProps: PropsFunc<T>,
  deps: any[] = [],
  customIdx?: string
) => {
  const idx = useIdx(customIdx);
  const reg = useRegistry();

  useEffect(() => {
    if (!reg.state[component.layoutRegion].regions[idx]) {
      reg.dispatch(
        reg.actions.addLayout(
          idx,
          component,
          isFunc(initialProps) ? initialProps(true) : initialProps
        )
      );
    }
  }, deps);

  useEffect(() => {
    return () => {
      if (!customIdx) {
        reg.dispatch(reg.actions.unmountLayout(idx, component.layoutRegion));
      }
    };
  }, []);

  const dispatch = useCallback(
    (action: Actions) => {
      if (isReducable(component)) {
        reg.dispatch(reg.actions.dispatchToLayout(idx, component, action));
      }
    },
    [reg.dispatch]
  );

  return [dispatch] as const;
};
