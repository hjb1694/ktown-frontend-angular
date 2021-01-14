import { Component } from '@angular/core';
import { SideMenuService } from 'src/app/global-components/side-menu/side-menu.service';

@Component({
    selector : 'app-discussions-home-page', 
    templateUrl : './discussions-home.page.html', 
    styleUrls : ['./discussions-home.page.scss']
})
export class DiscussionsHomePage{

    constructor(
        private sideMenuService: SideMenuService
    ){}

    public openSideMenu(){

        this.sideMenuService.openSideMenu();

    }

}