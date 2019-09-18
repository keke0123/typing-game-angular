import { Action } from '@ngrx/store';

export enum MainActionTypes {
  LoadMains = '[Main] Load Mains',
  ToggleGame = '[Main] Toggle Game',

}

export class LoadMains implements Action {
  readonly type = MainActionTypes.LoadMains;
}

export class ToggleGame implements Action {
  readonly type = MainActionTypes.ToggleGame;

  constructor(public payload: string) {}
}


export type MainActions = LoadMains | ToggleGame;
