import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './page/main/main.component';
import { DefaultComponent } from './layout/default/default.component';
import { StoreModule } from '@ngrx/store';
import * as fromMystore from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(fromMystore.mystoreFeatureKey, fromMystore.reducers, { metaReducers: fromMystore.metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
