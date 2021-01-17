import { NgModule } from '@angular/core';
import { DiscussionsHomePage } from './discussions-home.page';
import { DiscussionsHomePageRoutingModule } from './discussions-home-routing.module';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderBarComponentModule } from 'src/app/global-components/header-bar/header-bar.module';


@NgModule({
    imports : [
        CommonModule,
        DiscussionsHomePageRoutingModule,
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
        DiscussionsHomePage
    ], 
    exports : [
        DiscussionsHomePage, 
        DiscussionsHomePageRoutingModule, 
    ]
})
export class DiscussionsHomePageModule{}