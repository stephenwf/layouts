export enum LayoutRegion {
  Header = 'header',
  HeaderMenu = 'headerMenu',
  IconLayout = 'iconLayout',
  Icons = 'icons',
  BottomIcons = 'bottomIcons',
  LeftContextualHeader = 'leftContextualHeader',
  LeftNavigation = 'leftNavigation',
  LeftContextualFooter = 'leftContextualFooter',
  LeftSidebar = 'leftSidebar',
  ContentHeader = 'contentHeader',
  ContentFooter = 'contentFooter',
  RightSidebar = 'rightSidebar',
  RightSidebarActions = 'rightSidebarActions',
  Footer = 'footer',
}

export enum Layout {
  AddLayout = 'ADD_LAYOUT',
  UpdateLayout = 'UPDATE_LAYOUT',
  UpdateRegionContext = 'UPDATE_REGION_CONTEXT',
  UpdateGlobalContext = 'UPDATE_GLOBAL_CONTEXT',
  UnmountLayout = 'UNMOUNT_LAYOUT',
  DispatchToLayout = 'DISPATCH_TO_LAYOUT',
}
