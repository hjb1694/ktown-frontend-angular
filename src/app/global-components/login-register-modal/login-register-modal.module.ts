import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRegisterModalComponent} from './login-register-modal.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {RegisterFormBriefingComponent} from './register-form/briefing/briefing.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports : [
        CommonModule, 
        ReactiveFormsModule
    ], 
    declarations : [
        LoginRegisterModalComponent, 
        RegisterFormComponent, 
        RegisterFormBriefingComponent, 
        LoginFormComponent
    ], 
    exports : [
        LoginRegisterModalComponent
    ]
})
export class LoginRegisterModalModule{}