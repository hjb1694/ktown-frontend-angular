import {NgModule} from '@angular/core';
import {ProfilePage} from './profile.page';
import {CommonModule} from '@angular/common';
import {ProfilePageRoutingModule} from './profile-routing.module';
import { HeaderBarComponentModule } from 'src/app/global-components/header-bar/header-bar.module';


@NgModule({
    imports : [
        CommonModule, 
        ProfilePageRoutingModule, 
        HeaderBarComponentModule
    ], 
    declarations : [
        ProfilePage
    ], 
    exports : [
        ProfilePage
    ]
})
export class ProfilePageModule{}