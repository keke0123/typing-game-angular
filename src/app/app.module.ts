import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './page/main/main.component';
import { DefaultComponent } from './layout/default/default.component';
import { StoreModule } from '@ngrx/store';
import * as fromMystore from './store/reducers';
import {MainService} from './service/main/main.service';
import {ApiService} from './service/api/api.service';
import {HttpClientModule} from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { WordEffects } from './effect/word/word.effects';
import {reducers} from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreModule.forFeature(fromMystore.mystoreFeatureKey, fromMystore.reducers, { metaReducers: fromMystore.metaReducers }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([WordEffects]),
  ],
  providers: [
    MainService,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
