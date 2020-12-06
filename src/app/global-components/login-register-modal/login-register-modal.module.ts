import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRegisterModalComponent} from './login-register-modal.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {RegisterFormBriefingComponent} from './register-form/briefing/briefing.component';

@NgModule({
    imports : [
        CommonModule
    ], 
    declarations : [
        LoginRegisterModalComponent, 
        RegisterFormComponent, 
        RegisterFormBriefingComponent
    ], 
    exports : [
        LoginRegisterModalComponent
    ]
})
export class LoginRegisterModalModule{}