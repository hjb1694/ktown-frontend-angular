import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { LoginRegisterModalService } from '../global-components/login-register-modal/login-register-modal.service';
import { AuthService } from '../services/auth.service';


@Injectable({
    providedIn : 'root'
})
export class DenyIfNotAuth implements CanActivate{

    constructor(
        private authService: AuthService, 
        private router: Router, 
        private loginRegisterModalController: LoginRegisterModalService
    ){}

    canActivate(){
        if(!this.authService.user.getValue()){
            this.router.navigate(['/']);
            this.loginRegisterModalController.showModal.next(true);
            return false;
        }
        return true;
    }

}