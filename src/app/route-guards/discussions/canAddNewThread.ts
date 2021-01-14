import {Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertService } from 'src/app/global-components/alert/alert.service';
import { EmailVerificationModalService } from 'src/app/global-components/email-verification-modal/email-verification-modal.service';
import { LoginRegisterModalService } from 'src/app/global-components/login-register-modal/login-register-modal.service';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Injectable({
    providedIn : 'root'
})
export class CanAddNewThread implements CanActivate{

    constructor(
        private authService: AuthService, 
        private router: Router, 
        private loginRegisterModalService: LoginRegisterModalService,
        private emailVerificationModalService: EmailVerificationModalService, 
        private crudService: CrudService, 
        private alertService: AlertService
    ){}

    canActivate(): boolean | Promise<boolean> {
        const user = this.authService.user.getValue();
        if(!user!){
            this.router.navigate(['/', 'discussions']);
            this.loginRegisterModalService.showModal.next(true);
            return false;
        }

        if(!user.isVerified){
            this.router.navigate(['/','discussions']);
            this.emailVerificationModalService.showModal.next(true);
            return false;
        }

        return this.crudService.get('discussions/thread-adding-privilages',true).toPromise()
        .then(resp => {
            console.log(resp);
            return true;
        }).catch(err => {
            console.error(err);
            if(err.error?.errShortText){

                switch(err.error.shortText){
                    case 'INVALID_AUTH_TOKEN':
                    case 'ERR_NO_TOKEN':
                    case 'ERR_INVALID_TOKEN_FORMAT':
                        this.loginRegisterModalService.showModal.next(true);
                        this.authService.user.next(null);
                    break;
                    case 'ERR_NOT_VERIFIED':
                        this.emailVerificationModalService.showModal.next(true);
                    break;
                    case 'USER_DEACTIVATED':
                        this.alertService.showAlert.next({
                            color : 'red', 
                            content : 'No longer a registered user'
                        });
                        this.authService.user.next(null);
                    break;
                    case 'ERR_USER_ACCT_FROZEN':
                        this.alertService.showAlert.next({
                            color : 'red', 
                            content : 'Your account is frozen and under review by admins.'
                        });
                    break;
                    case 'ERR_MAX_THREADS_MET':
                        this.alertService.showAlert.next({
                            color : 'red', 
                            content : 'You have reached your maximum amount of threads for today.'
                        });
                    break;
                    default:
                        this.alertService.showAlert.next({
                            color : 'red', 
                            content : 'Something went wrong.'
                        });
                }
            }else{
                this.alertService.showAlert.next({
                    color : 'red', 
                    content : 'Something went wrong.'
                });
            }
            this.router.navigate(['/','discussions']);
            return false;
        });
        
        

    }

}