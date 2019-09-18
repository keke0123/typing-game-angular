import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ApiService} from '../../service/api/api.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {MainService} from '../../service/main/main.service';



@Injectable()
export class WordEffects {

  @Effect() getWord$ = this.actions$
    .pipe(
      ofType('[Word] Load Words'),
      switchMap((payload) => {
        console.log(payload);
        // return EMPTY;
        return this.apiService.getWord(this.mainService.getRandom())
          .pipe(
            map((res) => {
              console.log('res', res);
              return {
                type: '[Word] Set Words',
                payload: {
                  offsetX: this.mainService.getRandom(),
                  offsetY: 0,
                  value: res['value'],
                }
              }
            }),
            catchError((res) => {
              console.log('error', res);
              return EMPTY;
            })
          )
      }),
      // catchError(() => {
      //   return EMPTY;
      // })
    )

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private mainService: MainService
  ) {}

}
