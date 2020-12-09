import {Component, OnInit} from '@angular/core';
import { LoginRegisterModalService } from './login-register-modal.service';

@Component({
    selector : 'app-login-register-modal', 
    templateUrl : './login-register-modal.component.html', 
    styleUrls : ['./login-register-modal.component.scss']
})
export class LoginRegisterModalComponent implements OnInit{

    public showModal: boolean;
    public registerFormIsShown: boolean;
    public loginFormIsShown: boolean;

    constructor(
        private loginRegisterModalService: LoginRegisterModalService
    ){}

    ngOnInit(){

        this.loginRegisterModalService.showModal.subscribe(value => this.showModal = value);

        this.loginRegisterModalService.showLoginForm.subscribe(value => this.loginFormIsShown = value);

        this.loginRegisterModalService.showRegisterForm.subscribe(value => this.registerFormIsShown = value);

    }

    public showRegisterForm(){
        this.loginRegisterModalService.showRegisterForm.next(true);
        this.loginRegisterModalService.showLoginForm.next(false);
    }


    public showLoginForm(){
        this.loginRegisterModalService.showLoginForm.next(true);
        this.loginRegisterModalService.showRegisterForm.next(false);
    }

    public closeModal(){
        this.loginRegisterModalService.showModal.next(false);
        this.loginRegisterModalService.showRegisterForm.next(true);
        this.loginRegisterModalService.showLoginForm.next(false);
    }

}