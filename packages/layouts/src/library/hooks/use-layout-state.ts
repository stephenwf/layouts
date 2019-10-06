import { useReducer } from 'react';
import { layoutReducer } from '../reducer';
import { defaultLayoutState } from '../store';
import { LayoutStore } from '../types';
import * as actions from '../actions';

export const useLayoutState = () => {
  const [state, dispatch] = useReducer(layoutReducer, defaultLayoutState);

  return {
    state: state as LayoutStore,
    dispatch,
    actions,
  };
};
