import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {ApiService} from '../../service/api/api.service';
import {catchError, filter, map, switchMap, take} from 'rxjs/operators';
import {EMPTY, interval, Observable} from 'rxjs';
import {MainService} from '../../service/main/main.service';
import {Store} from '@ngrx/store';
import * as fromMyStore from '../../store/reducers';
import {WordActionTypes} from '../../store/word/word.actions';



@Injectable()
export class WordEffects {

  // 여기서 mergeMap 을 안쓰고 switchMap 을 쓰는 이유는
  // switchMap 을 쓰면 Load Words 가 완료된 다음 http request 만 take 한다.
  // effect annotation 을 붙이는 방법은 7.xx 버전
  // @Effect() getWord$ = this.actions$
  getWords$ = createEffect(() => this.actions$
    .pipe(
      // 직접 '[Word] Load Words' 이런식으로 불러오는것보다 action 을 가져와서 참조형식으로
      ofType(WordActionTypes.LoadWords),
      filter(() => this.word.length < 100),
      switchMap((payload) => {
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
  )

  // 아래는 피드백 반영 안한 상태로 둠
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
