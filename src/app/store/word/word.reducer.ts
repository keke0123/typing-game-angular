import { Action } from '@ngrx/store';

import * as wordActions from './word.actions';

export const wordFeatureKey = 'word';

export interface State {
  word: Array<any>;
  score: number;
  answer: string;
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
  answer: '',
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
    case wordActions.WordActionTypes.InputWords:
      return InputWord(state, action);
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
  // console.log('action payload', action['payload']);
  state.word = state.word
    .map((val) => {
      val['offsetY'] = val['offsetY'] + 5;
      if(val['offsetY'] >= 100) {
        state = scoreDown(state, action);
      }
      return val;
    });
  state.word.push(action['payload']);
  // console.log('word array', state.word);
  return {
    ...state
  }
}

function InputWord(state: State, action: wordActions.WordActions): State {
  // state.word.find
  // console.log(action);
  let word = action['payload'];
  let index = state.word.findIndex((val) => {
    // console.log(val);
    return val.value === word;
  });
  if(index >= 0) {
    state.word.splice(index, 1);
    state = scoreUp(state, action);
  }
  // console.log('index', index);
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
  state.word = state.word.filter((val) => {
    if(val['offsetY'] >= 100) {
      return false;
    }
    return true;
  });
  return {
    ...state,
    score: state.score - 1 >= 0 ? state.score - 1 : 0,
  }
}

// function popAnswer(state: State, action: wordActions.WordActions): State {
//   return {
//     ...state
//   }
// }
