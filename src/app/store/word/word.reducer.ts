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
  let scoreDownCount = 0;
  const word = state.word
    .filter((val) => {
      if(val['offsetY'] >= 100) {
        scoreDownCount++;
        return false;
      }
      return true;
    })
    .map((val, i) => {
      if(i == index && index >= 0) {
        val.isActive = true;
      }
      if(val['isActive'] === true) {
        val['offsetY'] = val['offsetY'] + 5;
      }
      return val;
    });
  let temp = 3000 - (Math.floor(state.score / 10) * 500);
  // console.log('load',
  //   {
  //     ...state,
  //     speed: temp < state.speed ? temp : state.speed,
  //     word: [
  //       ...word
  //     ],
  //     score: state.score - scoreDownCount
  //   })
  return {
    ...state,
    speed: temp < state.speed ? temp : state.speed,
    word: [
      ...word
    ],
    score: state.score - scoreDownCount
  }
}

function SetWord(state: State, action: wordActions.WordActions): State {
  /*
  *  state immutable 에 위반되는 실책
  *  state 를 직접 고치게되면 return 되는 곳 어디에서 무슨 오류가 생길지 모른다.
  *  라이브러리의 의도와는 맞지 않다.
  */
  // action['payload'].res.forEach((val, index) => {
  //   state.word.push({
  //     offsetX: action['payload'].fun(),
  //     offsetY: -5,
  //     value: val.value,
  //     isActive: false,
  //   });
  // });
  const word = action['payload'].res.map((val, index) => {
    return {
      offsetX: action['payload'].fun(),
      offsetY: -5,
      value: val.value,
      isActive: false,
    };
  });
  // console.log('set',
  //   {
  //   ...state,
  //     word: [
  //     ...state.word,
  //     ...word
  //   ],
  //   }
  // )
  return {
    ...state,
    word: [
      ...state.word,
      ...word
    ],
  }
}

function InputWord(state: State, action: wordActions.WordActions): State {
  // state.word.find
  // console.log(action);
  let words = action['payload'];
  let index = state.word.findIndex((val) => {
    // console.log(val);
    return (val.value === words && val.isActive === true);
  });
  let scoreUpCount = 0;
  let answer = {};
  const word = state.word.map((val, i) => {
    if(i == index && index >= 0) {
      scoreUpCount++;
      return false;
    }
    return val;
  })
  if(scoreUpCount > 0) {
    answer = {
      value: 'correct',
      isShow: true,
      color: 'blue',
    }
  } else {
    answer = {
      value: 'wrong',
      isShow: true,
      color: 'red',
    }
  }
  // console.log('input', state.answer.concat(answer));
  // console.log('answer', state.answer);
  return {
    ...state,
    word: [
      ...word
    ],
    score: state.score + scoreUpCount,
    answer: state.answer.concat(answer)
  }
}

function scoreUp(state: State, action: wordActions.WordActions): State {
  return {
    ...state,
    score: state.score + 1,
  }
}

function scoreDown(state: State, action: wordActions.WordActions): State {
  const word = state.word.filter((val) => {
    if(val['offsetY'] >= 100) {
      return false;
    }
    return true;
  });
  return {
    ...state,
    word: [
      ...state.word,
      word
    ],
    score: state.score - 1 >= 0 ? state.score - 1 : 0,
    gameover: state.score - 1 <= 0 ? true : state.gameover
  }
}

function returnAnswer(state: State, action: wordActions.WordActions): State {
  // if(state.answer.length > 0) {
  //   state.answer.splice(0, state.answer.length);
  // }
  return {
    ...state,
    answer: []
  }
}
