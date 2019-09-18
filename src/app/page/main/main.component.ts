import {Component, NgZone, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {interval, Observable, Subject} from 'rxjs';
import {filter, takeUntil, takeWhile, timeInterval} from 'rxjs/operators';
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
    this.store.select(fromMyStore.mystoreFeatureKey, 'main', 'url')
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((url) => {
        this.url = url;
      });
    // score
    this.store.select(fromMyStore.mystoreFeatureKey, 'word', 'score')
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((score) => {
        this.score = score;
      });

    // word
    this.store.select(fromMyStore.mystoreFeatureKey, 'word', 'word')
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.url === 'play'),
      )
      .subscribe((word) => {
        console.log('select word', word);
        this.word = word;
      });

    // timer
    interval(3000).pipe(
      takeUntil(this.destroy$),
      filter(() => this.url === 'play')
    )
      .subscribe((time) => {
        console.log('time', time);
        // word dispatch
        this.store.dispatch(new wordActions.LoadWords());
        // this.apiService.getWord(this.mainService.getRandom())
        //   .subscribe((res) => {
        //     console.log(res);
        //   })
      })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  testBtn() {
    // let test = this.mainService.getRandom();
    this.store.dispatch(new wordActions.ScoreDown());
    // console.log(test);
  }

  togglePlay(url) {
    this.store.dispatch(new mainActions.ToggleGame(url));
  }

}
