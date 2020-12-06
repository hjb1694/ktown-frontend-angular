import {Component} from '@angular/core';

@Component({
    selector : 'app-login-register-modal', 
    templateUrl : './login-register-modal.component.html', 
    styleUrls : ['./login-register-modal.component.scss']
})
export class LoginRegisterModalComponent{

    public showModal: boolean = true;
    public showRegisterForm: boolean = true;

}