import { Action } from '@ngrx/store';

export enum WordActionTypes {
  LoadWords = '[Word] Load Words',
  ScoreUp = '[Word] Score Up',
  ScoreDown = '[Word] Score Down',
  InitWord = '[Word] Init Word',
}

export class LoadWords implements Action {
  readonly type = WordActionTypes.LoadWords;
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


export type WordActions = LoadWords | ScoreUp | ScoreDown | InitWord;
