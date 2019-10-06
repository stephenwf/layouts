import { RegionLayoutState } from './../types';
import { LayoutRegion } from './../enum';
import { useMemo, createElement } from 'react';

export const useSingleComponent = <T extends LayoutRegion>(
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
        })[0]
      : undefined;
  }, [comp.active, comp.regions, ctx, comp.context]);
};
