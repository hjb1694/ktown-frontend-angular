import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AddDiscussionThreadPage } from './add-discussion-thread.page';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDiscussionThreadPageRoutingModule } from "./add-discussion-thread-routing.module";

@NgModule({
    imports : [
        AddDiscussionThreadPageRoutingModule,
        CommonModule,
        ReactiveFormsModule,
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