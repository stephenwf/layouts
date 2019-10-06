import React, { useEffect, useState, useCallback } from 'react';
import { FullLayout } from '@layouts/core';

function createCtx<A>() {
  const ctx = React.createContext<A | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const; // make TypeScript infer a tuple, not an array of union types
}

const useComponent = <P extends {}>(
  Component: React.ComponentType<P> & { layoutRegion: LayoutRegion },
  props: P,
  deps: React.DependencyList = []
) => {
  const [id, setId] = useState<string>();
  const context = useRegistry();

  useEffect(() => {
    if (!id) {
      const mainId = `idx_${idx()}`;
      setId(mainId);
      context.registerComponent(mainId, Component, props);
    } else {
      context.updateComponent(id, Component, props);
    }
  }, deps);
};

const useHeader = () => {
  const [count, setCount] = useState(0);

  useComponent(
    MyHeader,
    {
      title: `some title ${count}`,
    },
    [count]
  );

  return [count, () => setCount(count + 2)] as const;
};

enum LayoutRegion {
  Header = 'header',
  LeftSidebar = 'leftSidebar',
}
type RegionedType<P = {}> = React.FC<P> & { layoutRegion: LayoutRegion };

const useSidebar = () => {
  useComponent(MySidebar, {});
};

const MySidebar: RegionedType = () => <div>My Siderbar</div>;
MySidebar.layoutRegion = LayoutRegion.LeftSidebar;

const MyHeader: RegionedType<{ title: string }> = ({ title }) => (
  <div>header - {title}</div>
);
MyHeader.layoutRegion = LayoutRegion.Header;

const MockedContent: React.FC = () => {
  const [count, incr] = useHeader();
  useSidebar();

  return (
    <div>
      This is the content <button onClick={() => incr()}>+ ({count})</button>
    </div>
  );
};

type RegisterComponentType = <P extends {}>(
  id: string,
  Component: React.ComponentType<P> & { layoutRegion: LayoutRegion },
  props: P
) => void;

type Registry = {
  registerComponent: RegisterComponentType;
  updateComponent: RegisterComponentType;
  componentMap: ComponentMap;
};

const [useRegistry, Provider] = createCtx<Registry>();

type ComponentMap = {
  [K in LayoutRegion]: {
    [K: string]: () => JSX.Element;
  };
};

const MockedContainer: React.FC = ({ children }) => {
  const [components, setComponents] = useState<ComponentMap>({
    header: {},
    leftSidebar: {},
  });

  const registerComponent: RegisterComponentType = useCallback(
    (id, Component, props) => {
      setComponents(s => ({
        ...s,
        [Component.layoutRegion]: {
          ...(s[Component.layoutRegion] || {}),
          [id]: () => <Component {...props} />,
        },
      }));
    },
    [components, setComponents]
  );

  const updateComponent: RegisterComponentType = useCallback(
    (id, Component, props) => {
      setComponents(s => ({
        ...s,
        [Component.layoutRegion]: {
          ...(s[Component.layoutRegion] || {}),
          [id]: () => <Component {...props} />,
        },
      }));
    },
    [components, setComponents]
  );

  return (
    <Provider
      value={{ componentMap: components, updateComponent, registerComponent }}
    >
      <FullLayout
        header={components.header[Object.keys(components.header)[0]]}
        leftSidebar={
          components.leftSidebar[Object.keys(components.leftSidebar)[0]]
        }
      >
        {children}
      </FullLayout>
    </Provider>
  );
};

export const MockedRoot: React.FC = ({ children }) => {
  return (
    <MockedContainer>
      <MockedContent />
    </MockedContainer>
  );
};

type AbstractLayoutType<LR extends LayoutRegion, P extends {} = any> = {
  component: React.ComponentType<P>;
  props: P;
  region: LayoutRegion;
};

type LayoutType<LR extends LayoutRegion, P> = AbstractLayoutType<LR> & {
  id: string;
  component: React.ComponentType<P> & { layoutRegion: LayoutRegion };
  props: P;
};

type LayoutStore = {
  header:
    | {
        active: true;
        region: AbstractLayoutType<LayoutRegion.Header>;
      }
    | {
        active: false;
        region: null;
      };
  // headerMenu;
  // iconLayout;
  // icons;
  // bottomIcons;
  // leftContextualHeader;
  // leftNavigation;
  // leftContextualFooter;
  // leftSidebar;
  // contentHeader;
  // contentFooter;
  // rightSidebar;
  // rightSidebarActions;
  // footer;
};

function makeDefinition<P, LR extends LayoutRegion>(
  id: string,
  component: React.ComponentType<P> & { layoutRegion: LayoutRegion },
  props: P,
  region: LR
): LayoutType<LR, P> {
  return {
    id,
    component,
    props,
    region,
  };
}

const definition = makeDefinition(
  '1',
  MyHeader,
  { title: 'test' },
  LayoutRegion.Header
);

const store: LayoutStore = {
  header: {
    active: true,
    region: definition,
  },
};

if (store.header.active) {
  const Comp = store.header.region.component;
  console.log(<Comp {...store.header.region.props} />);
} else {
  console.log(store.header.region);
}
