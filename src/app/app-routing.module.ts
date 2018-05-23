import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { SecondPageComponent } from './modules/second-page/second-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'second', component: SecondPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
