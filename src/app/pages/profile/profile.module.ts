import {NgModule} from '@angular/core';
import {ProfilePage} from './profile.page';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';


@NgModule({
    imports : [
        CommonModule, 
        RouterModule
    ], 
    declarations : [
        ProfilePage
    ], 
    exports : [
        ProfilePage
    ]
})
export class ProfilePageModule{}