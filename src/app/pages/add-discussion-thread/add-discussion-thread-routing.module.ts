import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddDiscussionThreadPage } from "./add-discussion-thread.page";

const routes: Routes = [
    {
        path : '', 
        component : AddDiscussionThreadPage
    }
]

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ], 
    exports : [
        RouterModule
    ]
})
export class AddDiscussionThreadPageRoutingModule{}