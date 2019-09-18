import { Action } from '@ngrx/store';

export enum WordActionTypes {
  LoadWords = '[Word] Load Words',
  
  
}

export class LoadWords implements Action {
  readonly type = WordActionTypes.LoadWords;
}


export type WordActions = LoadWords;
