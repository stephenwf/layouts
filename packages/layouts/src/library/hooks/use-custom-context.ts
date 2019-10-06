import { LayoutRegion } from '../enum';
import { useRegistry } from '../context';
import { useMemo, useEffect } from 'react';

export const useCustomContext = <T extends any>(
  context: T,
  layoutRegion?: LayoutRegion,
  deps: any[] = [],
  resetContext?: (ctx: T) => T | undefined | null | void
) => {
  const reg = useRegistry();
  const savedContext = useMemo(() => context, deps);

  useEffect(() => {
    if (layoutRegion) {
      reg.dispatch(reg.actions.updateRegionContext(layoutRegion, savedContext));
    } else {
      reg.dispatch(reg.actions.updateGlobalContext(savedContext));
    }
  }, deps);

  useEffect(() => {
    return () => {
      if (resetContext) {
        reg.dispatch(
          reg.actions.updateGlobalContext(resetContext(savedContext) || {})
        );
      } else {
        reg.dispatch(
          reg.actions.updateGlobalContext(
            Object.keys(savedContext).reduce((acc: any, next: any) => {
              acc[next] = undefined;
              return acc;
            }, {})
          )
        );
      }
    };
  }, []);
};
