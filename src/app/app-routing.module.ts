import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './page/main/main.component';
import {DefaultComponent} from './layout/default/default.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    // redirectTo: 'main',
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        component: MainComponent,
      },
      {
        path: 'play',
        component: MainComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
