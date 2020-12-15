import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {HomePage} from './pages/home/home.page';
import {EditProfilePage} from './pages/edit-profile/edit-profile.page';

const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    component : HomePage
  }, 
  {
    path : 'profile/:username', 
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  }, 
  {
    path : 'edit-profile', 
    component : EditProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
