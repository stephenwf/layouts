import React from 'react';
import { Link } from 'react-router-dom';
import { DispatchableLayoutComponent, LayoutRegion } from '@layouts/core';

type Actions =
  | {
      type: 'ADD_MENU_ITEM';
      payload: { id: string; label: string; link: string };
    }
  | {
      type: 'EDIT_MENU_ITEM';
      payload: { id: string; label: string; link: string };
    }
  | {
      type: 'DELETE_MENU_ITEM';
      payload: { id: string };
    }
  | {
      type: 'SELECT_MENU_ITEM';
      payload: { id: string };
    }
  | {
      type: 'DESELECT_MENU_ITEM';
    };

export const NewMenuComponent: DispatchableLayoutComponent<
  {
    copyright?: string;
    selected?: string;
    menu: Array<{
      id: string;
      label: string;
      link: string;
    }>;
  },
  Actions
> = ({ menu, selected, copyright }) => {
  return (
    <div>
      {copyright ? <h3>{copyright}</h3> : null}
      <ul>
        {menu.map(({ id, label, link }) => (
          <li key={id}>
            {selected === id ? label : <Link to={link}>{label}</Link>}
          </li>
        ))}
      </ul>
    </div>
  );
};
NewMenuComponent.layoutRegion = LayoutRegion.HeaderMenu;
NewMenuComponent.propReducer = (props, action) => {
  switch (action.type) {
    case 'ADD_MENU_ITEM':
      if (props.menu.find(m => m.id === action.payload.id)) {
        return props;
      }
      return {
        ...props,
        menu: [...props.menu, action.payload],
      };
    case 'DELETE_MENU_ITEM':
      return {
        ...props,
        menu: props.menu.filter(m => m.id !== action.payload.id),
      };
    case 'SELECT_MENU_ITEM':
      return {
        ...props,
        selected: action.payload.id,
      };
    case 'EDIT_MENU_ITEM':
      return {
        ...props,
        menu: props.menu.map(m =>
          m.id === action.payload.id ? { ...m, label: action.payload.label } : m
        ),
      };
      break;
    case 'DESELECT_MENU_ITEM':
      return {
        ...props,
        selected: undefined,
      };
  }
  return props;
};
