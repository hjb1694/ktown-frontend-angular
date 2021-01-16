import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from 'src/app/custom-validators/text-validators';
import { AlertService } from 'src/app/global-components/alert/alert.service';
import { EmailVerificationModalService } from 'src/app/global-components/email-verification-modal/email-verification-modal.service';
import { LoginRegisterModalService } from 'src/app/global-components/login-register-modal/login-register-modal.service';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
    selector : 'app-thread-reply-form', 
    templateUrl : './reply-form.component.html', 
    styleUrls : ['./reply-form.component.scss']
})
export class ThreadReplyFormComponent implements OnInit{

    public replyForm: FormGroup;
    public formErrors: string[] = [];
    public replyProcessing: boolean = false;
    @Input('thread-id') threadId: number;
    @Output('reply-successful') replySuccessful = new EventEmitter<boolean>();

    constructor(
        private crudService: CrudService, 
        private loginRegisterModalService: LoginRegisterModalService, 
        private authService: AuthService, 
        private emailVerificationModalService: EmailVerificationModalService, 
        private alertService: AlertService
    ){}

    ngOnInit(){

        this.replyForm = new FormGroup({
            'reply' : new FormControl('',[
                CustomValidators.minLength(50)
            ])
        });

    }

    private validateReply(): boolean {
        let isValid: boolean = true;
        this.formErrors = [];

        if(this.replyForm.get('reply').hasError('minLenError')){
            this.formErrors.push('Reply is too short');
        }

        if(this.formErrors.length) isValid = false;
        return isValid;
    }


    public submitReply(): void {
        if(!this.validateReply()) return;

        this.replyProcessing = true;
        
        const sendData = {
            threadId : this.threadId, 
            reply : this.replyForm.get('reply').value
        }

        this.crudService.post('discussions/reply', sendData, true)
        .toPromise()
        .then((resp: any) => {
            this.replyForm.reset();
            this.replySuccessful.emit(true);
            console.log(resp);
        })
        .catch(err => {
            if(err.error?.errorShortText){

                switch(err.error.errorShortText){
                    case 'INVALID_AUTH_TOKEN':
                    case 'ERR_NO_TOKEN':
                    case 'ERR_INVALID_TOKEN_FORMAT':
                        this.authService.user.next(null);
                        this.loginRegisterModalService.showModal.next(true);
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
                    case 'ERR_BLOCKED':
                        this.alertService.showAlert.next({
                            color : 'red', 
                            content : 'You are either blocked by or have blocked this thread author.'
                        });
                    break;
                    case 'ERR_TOO_MANY_MENTIONS':
                        this.formErrors.push('You have too many @mentions.');
                    break;
                    default:
                        this.alertService.showAlert.next({
                            color : 'red', 
                            content : 'An error has occurred.'
                        });
                }

            }else{
                this.alertService.showAlert.next({
                    color : 'red', 
                    content : 'An error has occurred.'
                });
            }
        })
        .finally(() => {
            this.replyProcessing = false;
        });
    }


}