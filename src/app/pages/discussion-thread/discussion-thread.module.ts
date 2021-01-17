import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiscussionThreadPageRoutingModule } from './discussion-thread-routing.module';
import { DiscussionThreadPage } from './discussion-thread.page';
import { SafeHtmlPipe } from '../../pipes/safeHtml.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ThreadReplyComponentModule } from './reply-form/reply-form.module';
import { RoleBadgeComponent } from './role-badge/role-badge.component';
import { HeaderBarComponentModule } from 'src/app/global-components/header-bar/header-bar.module';



@NgModule({
    imports : [
        DiscussionThreadPageRoutingModule, 
        CommonModule, 
        ReactiveFormsModule, 
        ThreadReplyComponentModule, 
        HeaderBarComponentModule
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