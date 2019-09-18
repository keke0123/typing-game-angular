import { Action } from '@ngrx/store';

export enum WordActionTypes {
  ScoreUp = '[Word] Score Up',
  ScoreDown = '[Word] Score Down',
  InitWord = '[Word] Init Word',
  LoadWords = '[Word] Load Words',
  SetWords = '[Word] Set Words',
  InputWords = '[Word] Input Words'
}

export class ScoreUp implements Action {
  readonly type = WordActionTypes.ScoreUp;
}
export class ScoreDown implements Action {
  readonly type = WordActionTypes.ScoreDown;
}

export class InitWord implements Action {
  readonly type = WordActionTypes.InitWord;
}

export class LoadWords implements Action {
  readonly type = WordActionTypes.LoadWords;
}

export class SetWords implements Action {
  readonly type = WordActionTypes.SetWords;

  constructor(public payload: any) {}
}

export class InputWords implements Action {
  readonly type = WordActionTypes.InputWords;

  constructor(public payload: any) {}
}


export type WordActions = LoadWords | SetWords | InputWords | ScoreUp | ScoreDown | InitWord;
