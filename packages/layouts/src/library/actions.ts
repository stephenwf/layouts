import { LayoutRegion, Layout } from './enum';
import {
  GenericAction,
  AddLayoutAction,
  UpdateLayoutAction,
  UpdateRegionContextAction,
  UpdateGlobalContextAction,
  UnmountLayoutAction,
  DispatchToLayoutAction,
  LayoutComponent,
  DispatchableLayoutComponent,
} from './types';

export const addLayout = <Props>(
  id: string,
  component: LayoutComponent<Props>,
  props: Props,
  config: { order?: number; layoutRegion?: LayoutRegion } = {}
): GenericAction<Layout.AddLayout, AddLayoutAction<Props>> => ({
  type: Layout.AddLayout,
  payload: {
    id,
    component,
    props,
    order: config.order || 0,
    layoutRegion: config.layoutRegion || null,
  },
});

export const updateLayout = <Props>(
  id: string,
  component: LayoutComponent<Props>,
  props: Props,
  config: { layoutRegion?: LayoutRegion } = {}
): GenericAction<Layout.UpdateLayout, UpdateLayoutAction> => {
  return {
    type: Layout.UpdateLayout,
    payload: {
      id,
      props,
      layoutRegion: config.layoutRegion
        ? config.layoutRegion
        : component.layoutRegion,
    },
  };
};

export const updateRegionContext = <Props>(
  layoutRegion: LayoutRegion,
  context: Props
): GenericAction<Layout.UpdateRegionContext, UpdateRegionContextAction> => ({
  type: Layout.UpdateRegionContext,
  payload: {
    layoutRegion,
    context,
  },
});

export const updateGlobalContext = <Props>(
  context: Props
): GenericAction<Layout.UpdateGlobalContext, UpdateGlobalContextAction> => ({
  type: Layout.UpdateGlobalContext,
  payload: {
    context,
  },
});

export const unmountLayout = (
  id: string,
  layoutRegion: LayoutRegion
): GenericAction<Layout.UnmountLayout, UnmountLayoutAction> => ({
  type: Layout.UnmountLayout,
  payload: {
    id,
    layoutRegion,
  },
});

export const dispatchToLayout = <Props, Actions>(
  id: string,
  component: DispatchableLayoutComponent<Props, Actions>,
  action: Actions
): GenericAction<Layout.DispatchToLayout, DispatchToLayoutAction> => ({
  type: Layout.DispatchToLayout,
  payload: {
    id,
    layoutRegion: component.layoutRegion,
    action,
  },
});
