import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import * as fromWord from '../word/word.reducer';
import {wordFeatureKey} from '../word/word.reducer';
import * as fromMain from '../main/main.reducer';

export const mystoreFeatureKey = 'mystore';

export interface State {

  [fromWord.wordFeatureKey]: fromWord.State;
  [fromMain.mainFeatureKey]: fromMain.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromWord.wordFeatureKey]: fromWord.reducer,
  [fromMain.mainFeatureKey]: fromMain.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

// selector test
export const selectScore = (state: State) => state[wordFeatureKey].score;
export const selectWords = () => createSelector(
  selectScore,
  (score, props) => score + 10
);
// export const selectWords = createSelector(
//   selectScore,
//   ()
// )
// selector test
