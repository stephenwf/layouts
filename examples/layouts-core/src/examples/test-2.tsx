import React, { useState, useEffect } from 'react';
import { NewMenuComponent } from './prop-reducer';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import {
  LayoutComponent,
  LayoutRegion,
  useComponent,
  DispatchableLayoutComponent,
  useDispatchableComponent,
  useAsynComponent,
  LayoutContext,
} from '@layouts/core';

const CustomHeader: LayoutComponent<{
  testing: string;
  attribution?: string;
}> = ({ testing, attribution }) => {
  return (
    <div>
      Custom header {testing} {attribution ? attribution : null}
    </div>
  );
};
CustomHeader.layoutRegion = LayoutRegion.Header;

const CustomFooter: LayoutComponent<{ testing: string }> = ({ testing }) => {
  return <div>Custom footer {testing}</div>;
};
CustomFooter.layoutRegion = LayoutRegion.Footer;

const LeftHeaderIcon: LayoutComponent<{
  label: string;
  background?: string;
}> = ({ label, background = 'red' }) => {
  return <div style={{ width: 100, height: 100, background }}>{label}</div>;
};
LeftHeaderIcon.layoutRegion = LayoutRegion.Icons;

const NormalComponent: React.FC = () => {
  const [num, numSet] = useState(0);

  useComponent(LeftHeaderIcon, { label: `icon ${num}` }, [num]);

  return <button onClick={() => numSet(num + 1)}>++</button>;
};

const MenuComponent: DispatchableLayoutComponent<
  {
    menu?: Array<{ id: string; label: string; link: string }>;
  },
  {
    type: 'ADD_MENU_ITEM';
    payload: { id: string; link: string; label: string };
  }
> = ({ menu = [] }) => {
  if (!menu.length) {
    return <React.Fragment />;
  }
  return (
    <ul>
      {menu.map(item => (
        <li key={item.id}>
          <a href={item.link}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
};
MenuComponent.layoutRegion = LayoutRegion.HeaderMenu;
MenuComponent.propReducer = (props, action) => {
  return props;
};

const useSelectedMenuItem = (id: string) => {
  const [dispatch] = useDispatchableComponent(
    NewMenuComponent,
    { menu: [] },
    [],
    'my-menu'
  );

  useEffect(() => {
    dispatch({ type: 'SELECT_MENU_ITEM', payload: { id } });

    return () => {
      dispatch({ type: 'DESELECT_MENU_ITEM' });
    };
  }, [dispatch]);
};

const useNewMenuItem = (label: string, to: string) => {
  const id = to;
  const [dispatch] = useDispatchableComponent(
    NewMenuComponent,
    { menu: [] },
    [],
    'my-menu'
  );

  useEffect(() => {
    dispatch({ type: 'ADD_MENU_ITEM', payload: { id, label, link: to } });

    return () => {
      dispatch({ type: 'DELETE_MENU_ITEM', payload: { id } });
    };
  }, []);

  useEffect(() => {
    dispatch({ type: 'EDIT_MENU_ITEM', payload: { id, label, link: to } });
  }, [id, label, to]);
};

const MainTitle: LayoutComponent<{ title: string }> = ({ title }) => (
  <h1>{title}</h1>
);
MainTitle.layoutRegion = LayoutRegion.ContentHeader;

const Homepage: React.FC = () => {
  useComponent(MainTitle, { title: 'Home page' });
  useSelectedMenuItem('/');

  return (
    <div>
      This is my <strong>homepage.</strong>
      <Link to="/about">About</Link>
    </div>
  );
};

const About: React.FC = () => {
  useComponent(MainTitle, { title: 'About page' });
  useSelectedMenuItem('/about');

  return (
    <div>
      This is my about page. <Link to="/">Back home</Link>
    </div>
  );
};

const MockedContent: React.FC = () => {
  const [num, numSet] = useState(0);
  const [num2, numSet2] = useState(0);

  useNewMenuItem('Homepage', '/');
  useNewMenuItem('About', '/about');

  useComponent(CustomHeader, { testing: 'This is content.' });
  useComponent(LeftHeaderIcon, { label: `hook icon ${num2}` }, [num2]);
  useComponent(LeftHeaderIcon, () => ({ label: `hook icon ${num}` }), [num]);
  useAsynComponent(
    LeftHeaderIcon,
    async first => {
      if (first) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      return { label: 'async one!' };
    },
    [num]
  );
  useComponent(CustomFooter, { testing: 'Custom footer' }, []);

  return (
    <div>
      <div>
        Testing mocked content.
        <button onClick={() => numSet(num + 1)}>header +</button>
        <button onClick={() => numSet2(num2 + 1)}>footer +</button>
        {num % 2 === 1 ? <NormalComponent /> : null}
      </div>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
};

export const MockedRoot: React.FC = () => (
  <HashRouter>
    <LayoutContext>
      <MockedContent />
    </LayoutContext>
  </HashRouter>
);
