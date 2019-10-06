import produce, { Draft, original } from 'immer';
import { LayoutStore, LayoutActions } from './types';
import { Layout } from './enum';
import { isReducable } from './utility';

export const layoutReducer = produce(
  (state: Draft<LayoutStore>, action: LayoutActions) => {
    switch (action.type) {
      case Layout.AddLayout: {
        const region = action.payload.layoutRegion
          ? action.payload.layoutRegion
          : action.payload.component.layoutRegion;
        state[region].active = true;
        if (state[region].regions && state[region].regions[action.payload.id]) {
          break;
        }
        state[region].regions[action.payload.id] = {
          id: action.payload.id,
          props: action.payload.props,
          component: action.payload.component,
          order: action.payload.order,
        };
        break;
      }
      case Layout.UpdateLayout: {
        const region = action.payload.layoutRegion;
        if (
          !state[region].active ||
          !state[region].regions[action.payload.id]
        ) {
          // Error?
          break;
        }
        state[region].regions[action.payload.id].props = action.payload.props;
        break;
      }
      case Layout.UpdateRegionContext: {
        state[action.payload.layoutRegion].context = {
          ...state[action.payload.layoutRegion].context,
          ...action.payload.context,
        };
        break;
      }

      case Layout.UpdateGlobalContext: {
        state.globalContext = {
          ...state.globalContext,
          ...action.payload.context,
        };
        break;
      }

      case Layout.UnmountLayout: {
        const region = action.payload.layoutRegion;
        const id = action.payload.id;
        delete state[region].regions[id];
        if (Object.keys(state[region].regions).length === 0) {
          state[region].active = false;
        }
        break;
      }

      case Layout.DispatchToLayout: {
        const id = action.payload.id;
        const region = action.payload.layoutRegion;
        const { component } = state[region].regions[id];
        if (component && isReducable(component)) {
          const reducer = component.propReducer;
          state[region].regions[id].props = reducer(
            original(state[region].regions[id].props),
            action.payload.action
          );
        }
        break;
      }
    }
  }
);
