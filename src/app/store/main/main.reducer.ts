import { Action } from '@ngrx/store';

import * as mainActions from './main.actions';


export const mainFeatureKey = 'main';

export interface State {
  url: string;
}

export const initialState: State = {
  url: 'main',
};

export function reducer(state = initialState, action: mainActions.MainActions): State {
  switch (action.type) {
    case mainActions.MainActionTypes.ToggleGame:
      return toggleUrl(state, action);
    default:
      return state;
  }
}

function toggleUrl(state: State, action: mainActions.ToggleGame): State {
  console.log('state', state);
  return {
    ...state,
    url: action.payload
  }
}
