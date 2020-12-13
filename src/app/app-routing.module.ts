import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomePage} from './pages/home/home.page';
import {ProfilePage} from './pages/profile/profile.page';
import {EditProfilePage} from './pages/edit-profile/edit-profile.page';

const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    component : HomePage
  }, 
  {
    path : 'profile/:username', 
    component : ProfilePage
  }, 
  {
    path : 'edit-profile', 
    component : EditProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
