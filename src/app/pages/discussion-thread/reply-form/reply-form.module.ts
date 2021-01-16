import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ThreadReplyFormComponent } from './reply-form.component';

@NgModule({
    imports : [
        ReactiveFormsModule, 
        CommonModule
    ], 
    declarations : [
        ThreadReplyFormComponent
    ],
    exports : [
        ThreadReplyFormComponent
    ]
})
export class ThreadReplyComponentModule{}