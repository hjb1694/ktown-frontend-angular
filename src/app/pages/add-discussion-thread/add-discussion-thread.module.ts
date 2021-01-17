import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AddDiscussionThreadPage } from './add-discussion-thread.page';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDiscussionThreadPageRoutingModule } from "./add-discussion-thread-routing.module";
import { HeaderBarComponentModule } from "src/app/global-components/header-bar/header-bar.module";

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
        }), 
        HeaderBarComponentModule
    ], 
    declarations : [
        AddDiscussionThreadPage
    ], 
    exports : [
        AddDiscussionThreadPage
    ]
})
export class AddDiscussionThreadPageModule{}