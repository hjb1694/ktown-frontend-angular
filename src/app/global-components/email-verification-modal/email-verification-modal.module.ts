import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailVerificationModalComponent} from './email-verification-modal.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports : [
        CommonModule, 
        ReactiveFormsModule
    ], 
    declarations : [
        EmailVerificationModalComponent
    ], 
    exports : [
        EmailVerificationModalComponent
    ]
})
export class EmailVerificationModalModule{}