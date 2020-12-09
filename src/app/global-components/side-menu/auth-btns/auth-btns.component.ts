import { templateJitUrl } from '@angular/compiler';
import {Component} from '@angular/core';
import { LoginRegisterModalService } from '../../login-register-modal/login-register-modal.service';
import { SideMenuService } from '../side-menu.service';

@Component({
    selector : 'app-auth-btns',
    templateUrl: './auth-btns.component.html', 
    styleUrls : ['./auth-btns.component.scss']
})
export class AuthBtnsComponent{

    constructor(
        private loginRegisterModalService: LoginRegisterModalService,
        private sideMenuService: SideMenuService
    ){}

    public openRegister(){
        this.sideMenuService.closeSideMenu();
        this.loginRegisterModalService.showModal.next(true);
        this.loginRegisterModalService.showRegisterForm.next(true);
        this.loginRegisterModalService.showLoginForm.next(false);
    }

    public openLogin(){
        this.sideMenuService.closeSideMenu();
        this.loginRegisterModalService.showModal.next(true);
        this.loginRegisterModalService.showRegisterForm.next(false);
        this.loginRegisterModalService.showLoginForm.next(true);
    }



}