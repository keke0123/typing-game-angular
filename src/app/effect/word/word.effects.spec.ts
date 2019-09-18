import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { WordEffects } from './word.effects';

describe('WordEffects', () => {
  let actions$: Observable<any>;
  let effects: WordEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WordEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<WordEffects>(WordEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
