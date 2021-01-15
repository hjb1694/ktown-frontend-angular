import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscussionThreadPage } from './discussion-thread.page';

const routes: Routes = [
    {
        path : '', 
        component : DiscussionThreadPage
    }
];


@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ], 
    exports : [
        RouterModule
    ]
})
export class DiscussionThreadPageRoutingModule{}