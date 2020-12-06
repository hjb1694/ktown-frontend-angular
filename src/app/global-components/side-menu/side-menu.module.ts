import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {SideMenuComponent} from './side-menu.component';
import {NavLinkComponent} from './nav-link/nav-link.component';
import {AuthBtnsComponent} from './auth-btns/auth-btns.component';


@NgModule({
    imports : [
        CommonModule, 
        RouterModule
    ], 
    declarations : [
        SideMenuComponent, 
        NavLinkComponent, 
        AuthBtnsComponent
    ], 
    exports : [
        SideMenuComponent
    ]
})
export class SideMenuModule{}