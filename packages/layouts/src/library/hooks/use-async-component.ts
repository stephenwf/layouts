import { useState, useEffect } from 'react';
import { LayoutComponent } from '../types';
import { AsyncRetComp, useIdx } from '../utility';
import { useRegistry } from '../context';

export const useAsynComponent = <T extends LayoutComponent>(
  component: T,
  props: AsyncRetComp<T, boolean>,
  deps: any[] = [],
  customIdx?: string
) => {
  const idx = useIdx(customIdx);
  const reg = useRegistry();
  const [updating, setUpdating] = useState(false);
  let cancelled = false;

  useEffect(() => {
    props(true).then(resolvedProps => {
      if (cancelled) return;
      reg.dispatch(reg.actions.addLayout(idx, component, resolvedProps));
    });

    // (async () => {
    //   const resolvedProps = await props(true);
    //   if (cancelled) return;
    //   reg.dispatch(reg.actions.addLayout(idx, component, resolvedProps));
    // })().then(() => setLoaded(true));

    return () => {
      cancelled = true;
      if (!customIdx) {
        reg.dispatch(reg.actions.unmountLayout(idx, component.layoutRegion));
      }
    };
  }, []);

  useEffect(() => {
    setUpdating(true);

    props(false).then(resolvedProps => {
      if (cancelled) {
        return;
      }
      reg.dispatch(reg.actions.updateLayout(idx, component, resolvedProps));
      setUpdating(false);
    });

    // (async () => {
    //   const resolvedProps = await props(false);
    //   if (cancelled) {
    //     return;
    //   }
    //   reg.dispatch(reg.actions.updateLayout(idx, component, resolvedProps));
    // })().then(() => setUpdating(false));
  }, deps);

  return [updating] as const;
};
