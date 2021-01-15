import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiscussionThreadPageRoutingModule } from './discussion-thread-routing.module';
import { DiscussionThreadPage } from './discussion-thread.page';
import { SafeHtmlPipe } from '../../pipes/safeHtml.pipe';



@NgModule({
    imports : [
        DiscussionThreadPageRoutingModule, 
        CommonModule
    ], 
    declarations : [
        SafeHtmlPipe,
        DiscussionThreadPage
    ], 
    exports : [
        DiscussionThreadPage
    ]
})
export class DiscussionThreadPageModule{}