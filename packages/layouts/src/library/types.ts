import { LayoutRegion, Layout } from './enum';
import { RetComp } from './utility';

// #region utility functions
type AbstractLayoutType<P extends {} = any> = {
  id: string;
  order: number;
  component: React.ComponentType<P>;
  props: P;
};

export type RegionLayoutState<LR extends LayoutRegion> = {
  name: LR;
  active: boolean;
  context: any;
  regions: {
    [key: string]: AbstractLayoutType;
  };
};
// #endregion utility functions

export type LayoutStore = {
  [LR in LayoutRegion]: RegionLayoutState<LR>;
} & {
  globalContext: any;
};

// #region action-types
export type AddLayoutAction<Props = any> = {
  id: string;
  component: LayoutComponent<Props> | DispatchableLayoutComponent<Props>;
  order: number;
  props: Props;
  layoutRegion: LayoutRegion | null;
};

export type UpdateLayoutAction<
  Comp extends LayoutComponent = LayoutComponent<any>
> = {
  id: string;
  props: React.ComponentProps<Comp>;
  layoutRegion: LayoutRegion;
};

export type UpdateRegionContextAction<
  Props = any,
  LR extends LayoutRegion = LayoutRegion
> = {
  context: Props;
  layoutRegion: LR;
};

export type UpdateGlobalContextAction = {
  context: any;
};

export type UnmountLayoutAction = {
  id: string;
  layoutRegion: LayoutRegion;
};

export type DispatchToLayoutAction<
  Comp extends DispatchableLayoutComponent = DispatchableLayoutComponent,
  Actions extends DispatchableLayoutActionTypes<Comp> = any
> = {
  id: string;
  layoutRegion: LayoutRegion;
  action: Actions;
};

export type GenericAction<Type, Payload> = { type: Type; payload: Payload };

export type LayoutActions =
  | GenericAction<Layout.AddLayout, AddLayoutAction>
  | GenericAction<Layout.UpdateLayout, UpdateLayoutAction>
  | GenericAction<Layout.UpdateRegionContext, UpdateRegionContextAction>
  | GenericAction<Layout.UpdateGlobalContext, UpdateGlobalContextAction>
  | GenericAction<Layout.UnmountLayout, UnmountLayoutAction>
  | GenericAction<Layout.DispatchToLayout, DispatchToLayoutAction>;

// //#endregion action-types

export type LayoutComponent<P = any> = React.FC<P> & {
  layoutRegion: LayoutRegion;
};

export type DispatchableLayoutComponent<
  P = any,
  Actions = any
> = LayoutComponent<P> & {
  propReducer: (state: P, action: Actions) => P;
};

export type DispatchableLayoutActionTypes<
  Comp
> = Comp extends DispatchableLayoutComponent<any, infer Actions>
  ? Actions
  : never;

export type PropsFunc<T extends LayoutComponent> =
  | React.ComponentProps<T>
  | RetComp<T, boolean>;
