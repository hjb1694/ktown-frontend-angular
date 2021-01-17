import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {EditProfilePage} from './edit-profile.page';

import {ChangeImageModalComponent} from './change-image-modal/change-image-modal.component';

import {ImageCropperModule} from 'ngx-image-cropper';
import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { HeaderBarComponentModule } from 'src/app/global-components/header-bar/header-bar.module';


@NgModule({
    imports : [
        CommonModule, 
        RouterModule, 
        ImageCropperModule, 
        ReactiveFormsModule,
        EditProfileRoutingModule, 
        HeaderBarComponentModule
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