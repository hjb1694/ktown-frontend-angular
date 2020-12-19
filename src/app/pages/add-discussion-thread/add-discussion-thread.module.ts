import { NgModule } from "@angular/core";
import { AddDiscussionThreadPageRoutingModule } from './add-discussion-thread-routing.module';
import { AddDiscussionThreadPage } from './add-discussion-thread.page';
import {QuillModule} from 'ngx-quill';

@NgModule({
    imports : [
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