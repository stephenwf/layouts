import { RegionLayoutState, LayoutStore } from './types';
import { LayoutRegion } from './enum';
import * as actions from './actions';

export type Registry = {
  state: LayoutStore;
  actions: typeof actions;
  dispatch: any;
};

export const makeLayoutState = <T extends LayoutRegion>(
  name: T
): RegionLayoutState<T> => ({
  name,
  active: false,
  context: {},
  regions: {},
});

export const defaultLayoutState: LayoutStore = {
  globalContext: {},
  header: makeLayoutState(LayoutRegion.Header),
  headerMenu: makeLayoutState(LayoutRegion.HeaderMenu),
  iconLayout: makeLayoutState(LayoutRegion.IconLayout),
  icons: makeLayoutState(LayoutRegion.Icons),
  bottomIcons: makeLayoutState(LayoutRegion.BottomIcons),
  leftContextualHeader: makeLayoutState(LayoutRegion.LeftContextualHeader),
  leftNavigation: makeLayoutState(LayoutRegion.LeftNavigation),
  leftContextualFooter: makeLayoutState(LayoutRegion.LeftContextualFooter),
  leftSidebar: makeLayoutState(LayoutRegion.LeftSidebar),
  contentHeader: makeLayoutState(LayoutRegion.ContentHeader),
  contentFooter: makeLayoutState(LayoutRegion.ContentFooter),
  rightSidebar: makeLayoutState(LayoutRegion.RightSidebar),
  rightSidebarActions: makeLayoutState(LayoutRegion.RightSidebarActions),
  footer: makeLayoutState(LayoutRegion.Footer),
};
