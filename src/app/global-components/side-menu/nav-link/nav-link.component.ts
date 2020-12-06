import {Component, Input} from '@angular/core';
import { SideMenuService } from '../side-menu.service';

@Component({
    selector : 'app-nav-link', 
    templateUrl : './nav-link.component.html', 
    styleUrls : ['./nav-link.component.scss']
})
export class NavLinkComponent{

    constructor(
        private sideMenuService: SideMenuService
    ){}

    @Input() title: string;
    @Input() img: string; 
    @Input() link: string;


    public closeSideMenu(){

        this.sideMenuService.closeSideMenu();

    }
}