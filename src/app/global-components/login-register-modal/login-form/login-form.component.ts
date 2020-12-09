import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {CustomValidators} from '../../../custom-validators/text-validators';
import { LoginRegisterModalService } from '../login-register-modal.service';

@Component({
    selector : 'app-login-form', 
    templateUrl : './login-form.component.html', 
    styleUrls : ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{

    public loginForm: FormGroup;
    public errMsgs: string[] = [];
    public processing: boolean = false;

    constructor(
        private authService: AuthService, 
        private loginRegisterModalService: LoginRegisterModalService
    ){}

    ngOnInit(){
        this.loginForm = new FormGroup({
            email : new FormControl('', [
                CustomValidators.isValidEmail
            ]), 
            password : new FormControl('', [
                Validators.required
            ])
        });
    }

    public validateForm(): boolean {
        this.errMsgs = [];
        let isValid: boolean = true;

        if(this.loginForm.get('email').invalid){
            this.errMsgs.push('Please enter a valid email address.');
            isValid = false;
        }

        if(this.loginForm.get('password').invalid){
            this.errMsgs.push('Please enter a password.');
            isValid = false;
        }

        return isValid;
    }

    public submitForm(): void{
        if(!this.validateForm()) return;
        this.processing = true;

        this.authService.login(this.loginForm.value).subscribe(resp => {

            console.log('login passed');
            this.loginForm.reset();
            this.errMsgs = [];
            this.loginRegisterModalService.showModal.next(false);

        }, err => {
            if(err.error?.errorShortText === 'FORM_VALIDATION_ERR'){
                for(let {msg} of err.error.body.errors){
                    this.errMsgs.push(msg);
                }
            }else if(err.error?.errorShortText === 'ERR_INVALID_CREDENTIALS'){
                this.errMsgs.push(err.error.body);
            }else{
                this.errMsgs.push('There was an issue processing your request.');
            }
        }).add(() => {
            this.processing = false;
        });

    }

}