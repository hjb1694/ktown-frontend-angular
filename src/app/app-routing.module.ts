import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {HomePage} from './pages/home/home.page';
import { DenyIfNotAuth } from './route-guards/denyIfNotAuth.guard';

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
    canActivate : [DenyIfNotAuth],
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
