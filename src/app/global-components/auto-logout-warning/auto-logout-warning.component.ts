import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AutoLogoutWarningService } from './auto-logout-warning.service';


@Component({
    selector: 'app-auto-logout-warning', 
    templateUrl : './auto-logout-warning.component.html', 
    styleUrls : ['./auto-logout-warning.component.scss']
})
export class AutoLogoutWarningComponent{

    constructor(
        private autoLogoutWarningService: AutoLogoutWarningService, 
        private authService: AuthService
    ){}
    
    closeModal(){
        this.autoLogoutWarningService.showModal.next(false);
    }

    refreshLogin(){

        this.authService.refreshLogin()
        .subscribe((resp: any) => {

        }, err => {
            console.error(err);
        }).add(() => {
            this.autoLogoutWarningService.showModal.next(false);
        });

    }

}