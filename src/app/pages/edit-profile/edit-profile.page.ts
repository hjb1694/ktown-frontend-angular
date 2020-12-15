import {Component} from '@angular/core';
import { SideMenuService } from 'src/app/global-components/side-menu/side-menu.service';

@Component({
    selector : 'app-edit-profile', 
    templateUrl : './edit-profile.page.html', 
    styleUrls : ['./edit-profile.page.scss']
})
export class EditProfilePage{

    public profileImg = '../../../assets/no-user.png';
    public showImgEditModal: boolean = false;

    constructor(
        private sideMenuService: SideMenuService
    ){}

    public openSideMenu(){

        this.sideMenuService.openSideMenu();

    }

    public closeModal(){
        this.showImgEditModal = false;
    }

    public displayImgEditModal(){
        this.showImgEditModal = true;
    }

}