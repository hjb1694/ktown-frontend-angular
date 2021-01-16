import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiscussionThreadPageRoutingModule } from './discussion-thread-routing.module';
import { DiscussionThreadPage } from './discussion-thread.page';
import { SafeHtmlPipe } from '../../pipes/safeHtml.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ThreadReplyComponentModule } from './reply-form/reply-form.module';
import { RoleBadgeComponent } from './role-badge/role-badge.component';



@NgModule({
    imports : [
        DiscussionThreadPageRoutingModule, 
        CommonModule, 
        ReactiveFormsModule, 
        ThreadReplyComponentModule
    ], 
    declarations : [
        SafeHtmlPipe,
        DiscussionThreadPage, 
        RoleBadgeComponent
    ], 
    exports : [
        DiscussionThreadPage
    ]
})
export class DiscussionThreadPageModule{}