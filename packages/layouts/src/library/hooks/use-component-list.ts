import { LayoutRegion } from '../enum';
import { RegionLayoutState } from '../types';
import { useMemo, createElement } from 'react';

export const useComponentList = <T extends LayoutRegion>(
  comp: RegionLayoutState<T>,
  ctx: any = {}
) => {
  return useMemo(() => {
    return comp.active
      ? Object.keys(comp.regions).map(r => {
          const reg = comp.regions[r];
          return createElement(reg.component, {
            ...ctx,
            ...comp.context,
            ...reg.props,
          });
        })
      : undefined;
  }, [comp.active, comp.regions, ctx, comp.context]);
};
