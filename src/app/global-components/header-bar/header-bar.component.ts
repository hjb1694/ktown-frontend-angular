import { Component, OnInit } from '@angular/core';
import { SideMenuService } from '../side-menu/side-menu.service';


@Component({
    selector: 'app-header-bar', 
    templateUrl : './header-bar.component.html', 
    styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit{

    constructor(
        private sideMenuService: SideMenuService
    ){}

    ngOnInit(){}

    public openSideMenu(): void{

        this.sideMenuService.openSideMenu();

    }


}