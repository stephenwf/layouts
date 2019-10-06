import React from 'react';
import { createCtx } from './utility';
import { Registry } from './store';
import { useLayoutState } from './hooks/use-layout-state';
import { FullLayout } from '../components/FullLayout/FullLayout';
import { useSingleComponent } from './hooks/use-single-component';
import { useComponentList } from './hooks/use-component-list';

const [useRegistry, Provider] = createCtx<Registry>();

export const LayoutContext: React.FC = ({ children }) => {
  const layouts = useLayoutState();
  const ctx = layouts.state.globalContext;
  const map = layouts.state;

  return (
    <Provider value={layouts}>
      <FullLayout
        header={useSingleComponent(map.header, ctx)}
        headerMenu={useComponentList(map.headerMenu, ctx)}
        icons={useComponentList(map.icons, ctx)}
        bottomIcons={useComponentList(map.bottomIcons, ctx)}
        leftContextualHeader={useComponentList(map.leftContextualHeader, ctx)}
        leftNavigation={useSingleComponent(map.leftNavigation, ctx)}
        leftContextualFooter={useComponentList(map.leftContextualFooter, ctx)}
        leftSidebar={useSingleComponent(map.leftSidebar, ctx)}
        contentHeader={useComponentList(map.contentHeader, ctx)}
        contentFooter={useComponentList(map.contentFooter, ctx)}
        rightSidebar={useSingleComponent(map.rightSidebar, ctx)}
        rightSidebarActions={useComponentList(map.rightSidebarActions, ctx)}
        footer={useSingleComponent(layouts.state.footer, ctx)}
      >
        {children}
      </FullLayout>
    </Provider>
  );
};

export { useRegistry };
