import {Component, NgZone, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {iif, interval, Observable, of, Subject} from 'rxjs';
import {filter, map, switchMap, take, takeUntil, takeWhile, timeInterval} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import * as fromMyStore from '../../store/reducers';
import * as mainActions from '../../store/main/main.actions';
import * as wordActions from '../../store/word/word.actions';
import {MainService} from '../../service/main/main.service';
import {WordActionTypes} from '../../store/word/word.actions';
import {ApiService} from '../../service/api/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  url = '';
  score = 5;

  word = [];

  answer = [];

  speed = 3000;

  gameover = false;

  timeInterval$: Subject<number> = new Subject<number>();

  // destroy
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private zone: NgZone,
    private store: Store<fromMyStore.State>,
    private mainService: MainService,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    // url
    this.selectValue('url', 'main', 'url');
    // score
    this.selectValue('score', 'word', 'score');
    // word
    this.selectValue('word', 'word', 'word', this.url === 'play');
    // answer
    this.selectValue('answer', 'word', 'answer');
    // gameover
    this.selectValue('gameover', 'word', 'gameover');

    // speed
    this.store.select(fromMyStore.mystoreFeatureKey, 'word', 'speed')
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((speed) => {
        // console.log('speed', speed);
        this.speed = speed;
        this.changeSpeed(this.speed);
      });

    this.timeInterval$
      .pipe(
        switchMap((num) =>
          interval(num)
            .pipe(
              takeUntil(this.destroy$),
              filter(() => this.url === 'play')
            )
        ),
      )
      .subscribe((time) => {
        // console.log('time', time);
        this.store.dispatch(new wordActions.LoadWords(time));
      });

    this.changeSpeed(this.speed);
  }

  // timer 수정
  changeSpeed(num) {
    this.timeInterval$.next(num);
  }

  // select
  selectValue(ref, reducer, state, fil=true) {
    this.store.select(fromMyStore.mystoreFeatureKey, reducer, state)
      .pipe(
        takeUntil(this.destroy$),
        filter(() => fil)
      )
      .subscribe((val) => {
        this[ref] = val;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  togglePlay(url) {
    this.store.dispatch(new mainActions.ToggleGame(url));
  }

  keyupEnter(event) {
    // console.log('event', event);
    let word = event.target.value;
    event.target.value = '';
    if(this.url !== 'play') {
      return false;
    }
    this.store.dispatch(new wordActions.InputWords(word));
  }

  // testBtn() {
  //   this.apiService.getTest()
  //     .subscribe((res) => {
  //       console.log('test', res);
  //     });
  // }

}
