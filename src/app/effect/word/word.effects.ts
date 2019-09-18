import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ApiService} from '../../service/api/api.service';
import {catchError, filter, map, switchMap, take} from 'rxjs/operators';
import {EMPTY, interval, Observable} from 'rxjs';
import {MainService} from '../../service/main/main.service';
import {Store} from '@ngrx/store';
import * as fromMyStore from '../../store/reducers';



@Injectable()
export class WordEffects {

  @Effect() getWord$ = this.actions$
    .pipe(
      ofType('[Word] Load Words'),
      filter(() => this.word.length < 100),
      switchMap((payload) => {
        // console.log(payload);
        //
        return this.apiService.getWords()
          .pipe(
            filter(() => this.word.length < 30),
            map((res) => {
              return {
                type: '[Word] Set Words',
                payload: {
                  res: res,
                  fun: this.mainService.getRandom
                }
              }
            }),
            catchError((res) => {
              console.log('error', res);
              return EMPTY;
            })
          )
      }),
    )

  @Effect() answer$ = this.actions$
    .pipe(
      ofType('[Word] Input Words'),
      switchMap(() => {
        return interval(1000).pipe(
          filter(() => {
            return this.answer.length > 0;
          }),
          map(() => {
            console.log('return answer');
            return {
              type: '[Word] Return Answer'
            }
          })
        )
      })
    )

  answer = [];
  word = [];

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private mainService: MainService,
    private store: Store<fromMyStore.State>,
  ) {
    this.store.select(fromMyStore.mystoreFeatureKey, 'word', 'answer')
      .subscribe((val) => {
        this.answer = val;
      })
    this.store.select(fromMyStore.mystoreFeatureKey, 'word', 'word')
      .subscribe((val) => {
        this.word = val;
      })
  }

}
