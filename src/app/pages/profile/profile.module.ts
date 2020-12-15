import {NgModule} from '@angular/core';
import {ProfilePage} from './profile.page';
import {CommonModule} from '@angular/common';
import {ProfilePageRoutingModule} from './profile-routing.module';


@NgModule({
    imports : [
        CommonModule, 
        ProfilePageRoutingModule
    ], 
    declarations : [
        ProfilePage
    ], 
    exports : [
        ProfilePage
    ]
})
export class ProfilePageModule{}