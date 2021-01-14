import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {HomePage} from './pages/home/home.page';
import { DenyIfNotAuth } from './route-guards/denyIfNotAuth.guard';
import { CanAddNewThread } from './route-guards/discussions/canAddNewThread';

const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    component : HomePage
  }, 
  {
    path : 'profile/user/:username', 
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  }, 
  {
    path : 'profile/edit', 
    canActivate : [DenyIfNotAuth],
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  }, 
  {
    path : 'discussions/add',
    canActivate : [CanAddNewThread], 
    loadChildren: () => import('./pages/add-discussion-thread/add-discussion-thread.module').then(m => m.AddDiscussionThreadPageModule)
  },
  {
    path : 'discussions', 
    loadChildren: () => import('./pages/discussions-home/discussions-home.module').then(m => m.DiscussionsHomePageModule), 
  },
  {
    path : '**', 
    redirectTo : ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
