import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from '../alert/alert.service';
import { LoginRegisterModalService } from '../login-register-modal/login-register-modal.service';
import { AutoLogoutWarningService } from './auto-logout-warning.service';


@Component({
    selector: 'app-auto-logout-warning', 
    templateUrl : './auto-logout-warning.component.html', 
    styleUrls : ['./auto-logout-warning.component.scss']
})
export class AutoLogoutWarningComponent{

    constructor(
        private autoLogoutWarningService: AutoLogoutWarningService, 
        private authService: AuthService, 
        private alertService: AlertService, 
        private loginRegisterModalService: LoginRegisterModalService
    ){}
    
    closeModal(){
        this.autoLogoutWarningService.showModal.next(false);
    }

    refreshLogin(){

        this.authService.refreshLogin()
        .subscribe((resp: any) => {

        }, err => {
            console.error(err);

            if(err.errors?.errorShortText){
                switch(err.errors.errorShortText){
                    case 'INVALID_AUTH_TOKEN':
                    case 'ERR_NO_TOKEN':
                        this.authService.logout();
                        this.loginRegisterModalService.showModal.next(true);
                    break;
                    default: 
                        this.alertService.showAlert.next({
                            color : 'red', 
                            content : 'Unable to refresh login'
                        });
                }
            }else{
                this.alertService.showAlert.next({
                    color : 'red', 
                    content : 'Unable to refresh login'
                });
            }


        }).add(() => {
            this.autoLogoutWarningService.showModal.next(false);
        });

    }

}