import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditProfilePage} from './edit-profile.page';


@NgModule({
    imports : [
        CommonModule
    ], 
    declarations : [
        EditProfilePage
    ],
    exports : [
        EditProfilePage
    ]
})
export class EditProfilePageModule{}