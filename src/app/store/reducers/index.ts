import {ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
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
// export const selectFeature = createFeatureSelector<State>(fromWord.wordFeatureKey);
export const selectScore = (state: State) => state[fromWord.wordFeatureKey].score;

// export const selectWords = () => createSelector(
//   selectScore,
//   (state, props) => state
// );
export const selectFeatureScore = createSelector(
  selectScore,
  (state, props) => {
    console.log('state', state);
    console.log('props', props);
    return state + 10;
  }
);
// export const selectWords = createSelector(
//   selectScore,
//   ()
// )
// selector test
