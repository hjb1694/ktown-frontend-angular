import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscussionsHomePage } from './discussions-home.page';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path : '', 
        component : DiscussionsHomePage
    }
];


@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild(routes)
    ], 
    exports : [
        RouterModule
    ]
})
export class DiscussionsHomePageRoutingModule{}