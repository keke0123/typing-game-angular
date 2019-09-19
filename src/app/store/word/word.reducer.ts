import { Action } from '@ngrx/store';

import * as wordActions from './word.actions';

export const wordFeatureKey = 'word';

export interface State {
  word: Array<any>;
  score: number;
  answer: Array<any>;
  speed: number;
  gameover: boolean;
}

export const initialState: State = {
  /*
    word = [
      {
        offsetX: number,
        offsetY: number,
        value: string,
        isActive: false,
      }
    ]
    score = number
  */
  word: [],
  score: 5,
  answer: [],
  speed: 3000,
  gameover: false,
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
    case wordActions.WordActionTypes.ReturnAnswer:
      return returnAnswer(state, action);
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
  let index = state.word.findIndex((val) => {
    return val.isActive === false;
  });
  if(index >= 0) {
    state.word[index].isActive = true;
  }
  state.word = state.word
    .map((val) => {
      if(val['isActive'] === true) {
        val['offsetY'] = val['offsetY'] + 5;
      }
      if(val['offsetY'] >= 100) {
        state = scoreDown(state, action);
      }
      return val;
    });
  let temp = 3000 - (Math.floor(state.score / 10) * 500);
  if(temp < state.speed) {
    state.speed = temp;
  }
  return {
    ...state,
  }
}

function SetWord(state: State, action: wordActions.WordActions): State {
  // console.log('set data');
  // console.log('action payload', action['payload']);
  // console.warn('state word', state.word);
  action['payload'].res.forEach((val, index) => {
    state.word.push({
      offsetX: action['payload'].fun(),
      offsetY: -5,
      value: val.value,
      isActive: false,
    });
  });
  // state.word.push(action['payload']);
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
    return (val.value === word && val.isActive === true);
  });
  if(index >= 0) {
    state.word.splice(index, 1);
    state = scoreUp(state, action);
    //
    state.answer.push(
      {
        value: 'correct',
        isShow: true,
        color: 'blue',
      }
    );
  } else {
    //
    state.answer.push(
      {
        value: 'wrong',
        isShow: true,
        color: 'red',
      }
    );
  }
  // console.log('index', index);
  // console.log(state.answer);
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
    gameover: state.score - 1 <= 0 ? true : state.gameover
  }
}

function returnAnswer(state: State, action: wordActions.WordActions): State {
  if(state.answer.length > 0) {
    state.answer.splice(0, state.answer.length);
  }
  return {
    ...state
  }
}
