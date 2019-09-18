import { Action } from '@ngrx/store';

import * as wordActions from './word.actions';

export const wordFeatureKey = 'word';

export interface State {
  word: Array<any>;
  score: number;
}

export const initialState: State = {
  /*
    word = [
      {
        offsetX: number,
        offsetY: number,
        value: string
      }
    ]
    score = number
  */
  word: [],
  score: 5,
};

export function reducer(state = initialState, action: wordActions.WordActions): State {
  switch (action.type) {
    case wordActions.WordActionTypes.ScoreUp:
      return scoreUp(state, action);
    case wordActions.WordActionTypes.ScoreDown:
      return scoreDown(state, action);
    case wordActions.WordActionTypes.InitWord:
      return InitWord(state, action);
    case wordActions.WordActionTypes.LoadWords:
      return LoadWord(state, action);
    case wordActions.WordActionTypes.SetWords:
      return SetWord(state, action);
    default:
      return state;
  }
}

function InitWord(state: State, action: wordActions.WordActions): State {
  return {
    ...initialState
  }
}

function LoadWord(state: State, action: wordActions.WordActions): State {
  return {
    ...state
  }
}
function SetWord(state: State, action: wordActions.WordActions): State {
  console.log('action payload', action['payload']);
  state.word.forEach((val) => {
    val['offsetY'] = val['offsetY'] + 5;
  });
  state.word.push(action['payload']);
  console.log('word array', state.word);
  return {
    ...state
  }
}

function scoreUp(state: State, action: wordActions.WordActions): State {
  return {
    ...state,
    score: state.score + 1,
  }
}

function scoreDown(state: State, action: wordActions.WordActions): State {
  return {
    ...state,
    score: state.score - 1,
  }
}
