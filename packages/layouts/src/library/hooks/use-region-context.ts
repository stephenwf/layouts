import { LayoutComponent, PropsFunc } from '../types';

import { useCustomContext } from './use-custom-context';

export const useRegionContext = <
  T extends LayoutComponent,
  C extends Partial<PropsFunc<T>>
>(
  component: T,
  context: C,
  deps: any[] = [],
  resetContext?: (ctx: C) => void
) => {
  useCustomContext(context, component.layoutRegion, deps, resetContext);
};
