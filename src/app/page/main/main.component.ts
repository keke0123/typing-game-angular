import {Component, NgZone, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import * as fromMyStore from '../../store/reducers';
import * as mainActions from '../../store/main/main.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  url = '';
  // destroy
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private zone: NgZone,
    private store: Store<fromMyStore.State>
  ) { }

  ngOnInit() {
    // this.router.events.pipe(
    //   takeUntil(this.destroy$),
    //   filter((event) => {
    //     return event instanceof NavigationEnd;
    //   })
    // )
    //   .subscribe((val) => {
    //     let urlArray = val['url'].split('/');
    //     this.url = urlArray[urlArray.length - 1];
    //     this.url = this.url === '' ? 'main' : this.url;
    //     console.log('url', this.url);
    //   })
    this.store.select(fromMyStore.mystoreFeatureKey, 'main', 'url')
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((url) => {
        this.url = url;
        console.log('url', this.url);
        // console.log('test');
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  togglePlay(url) {
    // this.zone.run(() => {
    //   this.router.navigate([`/${url}`]);
    // });
    // console.log('toggle');
    this.store.dispatch(new mainActions.ToggleGame(url));
    // this.router.navigate([`/${url}`]);
    // console.log(this.url);
  }

}
