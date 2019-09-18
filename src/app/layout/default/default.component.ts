import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as fromMyStore from '../../store/reducers';
import {takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import * as wordActions from '../../store/word/word.actions';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  // destroy
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private store: Store<fromMyStore.State>
  ) { }

  ngOnInit() {
    this.router.navigate(['']);
    this.store.select(fromMyStore.mystoreFeatureKey, 'main', 'url')
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((url) => {
        // this.url = url;
        this.router.navigate([`/${url}`]);
        console.log('url', url);
        if(url === 'play') {
          console.log('init score');
          this.store.dispatch(new wordActions.InitWord());
        }
        // console.log('test');
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
