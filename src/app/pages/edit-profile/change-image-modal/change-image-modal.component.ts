import {Component, EventEmitter, Output} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AlertService } from 'src/app/global-components/alert/alert.service';
import { LoginRegisterModalService } from 'src/app/global-components/login-register-modal/login-register-modal.service';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
    selector : 'app-change-image-modal', 
    templateUrl : './change-image-modal.component.html', 
    styleUrls : ['./change-image-modal.component.scss']
})
export class ChangeImageModalComponent{

    @Output() modalClose = new EventEmitter();
    @Output() imageLoadSuccessful = new EventEmitter();

    public imageChangedEvent: any;
    public showImageSelectors: boolean = true;
    public showCropper: boolean = false;
    public showCropAndSaveBtn: boolean = false;
    public croppedImage: any;
    public showLoading: boolean = false;
    public showCloseBtn: boolean = true;
    public isProcessingError: boolean = false;

    constructor(
        private crudService: CrudService, 
        private alertService: AlertService, 
        private authService: AuthService, 
        private loginRegisterModalService: LoginRegisterModalService
    ){}

    public fileChange(event: any): void {
        this.imageChangedEvent = event;
        this.showImageSelectors = false;
        this.showCropper = true;
    }

    public imageLoaded(){
        this.showCropAndSaveBtn = true;
    }

    public imageCropped(event: ImageCroppedEvent){
        this.croppedImage = event.base64;
    }

    public checkResponseError(err: any) {

        if(err.errors?.errorShortText){
            switch(err.errors.errorShortText){
                case 'INVALID_AUTH_TOKEN':
                case 'ERR_NO_TOKEN':
                case 'ERR_INVALID_TOKEN_FORMAT':
                    this.loginRegisterModalService.showModal.next(true);
                    this.authService.logout();
                break;
                case 'USER_DEACTIVATED':
                    this.alertService.showAlert.next({
                        color : 'red', 
                        content : 'Your account has been deactivated.'
                    });
                    this.authService.logout();
                break;
                case 'ERR_USER_ACCT_FROZEN':
                    this.alertService.showAlert.next({
                        color : 'red', 
                        content : 'Your account is frozen and under review by staff.'
                    });
                break;
                default: 
                    this.alertService.showAlert.next({
                        color : 'red', 
                        content : 'Unable to process your request at this time.'
                    });
            }
        }else{
            this.alertService.showAlert.next({
                color : 'red', 
                content : 'Unable to process your request at this time.'
            });
        }

        this.isProcessingError = true;
        this.showCloseBtn = true;

    }

    public save(){
        this.showCropper = false;
        this.showLoading = true;
        this.showCloseBtn = false;

        this.crudService.post(
            'profile/upload-new-profile-img', 
            {image : this.croppedImage}, 
            true
        )
        .subscribe((resp: any) => {
            this.imageLoadSuccessful.emit(true);
            this.alertService.showAlert.next({
                color : 'green', 
                content : 'Profile image was successfully updated!'
            });

        }, err => {
            this.checkResponseError(err);
        });
    }

    public closeModal(){
        this.modalClose.emit(true);
    }
}