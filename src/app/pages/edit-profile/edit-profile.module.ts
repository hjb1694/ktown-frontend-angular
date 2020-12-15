import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {EditProfilePage} from './edit-profile.page';

import {ChangeImageModalComponent} from './change-image-modal/change-image-modal.component';

import {ImageCropperModule} from 'ngx-image-cropper';


@NgModule({
    imports : [
        CommonModule, 
        RouterModule, 
        ImageCropperModule
    ], 
    declarations : [
        EditProfilePage, 
        ChangeImageModalComponent
    ],
    exports : [
        EditProfilePage, 
        ChangeImageModalComponent
    ], 
    schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditProfilePageModule{}