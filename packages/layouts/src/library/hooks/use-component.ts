import { useEffect } from 'react';
import { LayoutComponent, PropsFunc } from '../types';
import { useIdx, isFunc } from '../utility';
import { useRegistry } from '../context';

export const useComponent = <T extends LayoutComponent>(
  component: T,
  props: PropsFunc<T>,
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
          isFunc(props) ? props(true) : props
        )
      );
    } else {
      reg.dispatch(
        reg.actions.updateLayout(
          idx,
          component,
          isFunc(props) ? props(false) : props
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
};
