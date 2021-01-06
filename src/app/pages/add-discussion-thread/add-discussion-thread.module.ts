import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AddDiscussionThreadPageRoutingModule } from './add-discussion-thread-routing.module';
import { AddDiscussionThreadPage } from './add-discussion-thread.page';
import {QuillModule} from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports : [
        CommonModule,
        ReactiveFormsModule,
        AddDiscussionThreadPageRoutingModule, 
        QuillModule.forRoot({
            modules : {
                toolbar : [
                    ['bold','italic','image']
                ]
            }
        })
    ], 
    declarations : [
        AddDiscussionThreadPage
    ], 
    exports : [
        AddDiscussionThreadPage
    ]
})
export class AddDiscussionThreadPageModule{}