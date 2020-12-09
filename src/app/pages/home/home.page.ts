import {Component} from '@angular/core';
import { SideMenuService } from 'src/app/global-components/side-menu/side-menu.service';


@Component({
    selector : 'app-home', 
    templateUrl : './home.page.html', 
    styleUrls : ['./home.page.scss']
})
export class HomePage{

    constructor(
        private sideMenuService: SideMenuService
    ){}

    public openSideMenu(){

        this.sideMenuService.openSideMenu();

    }

}