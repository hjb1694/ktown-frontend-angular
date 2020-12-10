import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { EmailVerificationModalService } from './email-verification-modal.service';


@Component({
    selector : 'app-email-verification-modal', 
    templateUrl : './email-verification-modal.component.html', 
    styleUrls : ['./email-verification-modal.component.scss']
})
export class EmailVerificationModalComponent implements OnInit{

    public showModal: boolean = false;
    public showProcessing: boolean = false;
    public showForm: boolean = true;
    public showMessage: boolean = false;
    public veriCodeForm: FormGroup;
    public message: string = null;

    constructor(
        private emailVerificationModalService: EmailVerificationModalService, 
        private crudService: CrudService, 
        private authService: AuthService
    ){}

    ngOnInit(){

        this.emailVerificationModalService.showModal.subscribe(value => {
            if(value){
                this.showModal = true;
                this.showProcessing = false;
                this.showForm = true;
                this.showMessage = false;
            }else{
                this.showModal = false;
            }
        });

        this.veriCodeForm = new FormGroup({
            vericode : new FormControl('', [
                Validators.required
            ])
        });

    }

    private enableProcessing(){
        this.showProcessing = true;
        this.showForm = false;
        this.showMessage = false;
    }

    public enableShowForm(){
        this.veriCodeForm.reset();
        this.showProcessing = false; 
        this.showForm = true;
        this.showMessage = false;
    }

    public resendVerification(){
        this.enableProcessing();

        this.crudService.post('auth/new-user-verification-code', {}, true)
        .subscribe((resp: any) => {

            this.showProcessing = false;
            this.showForm= false;
            this.showMessage = true;

            this.message = 'A new verification code has been sent.';

        }, err => {

            this.showProcessing = false;
            this.showForm= false;
            this.showMessage = true;

            if(err.error?.body){
                this.message = err.error.body;
            }else{
                this.message = 'There was an issue processing your request.';
            }

        });
    }

    public processForm(){
        this.enableProcessing();
        this.crudService.post('auth/verify-user', this.veriCodeForm.value, true)
        .subscribe((resp: any) => {

            this.emailVerificationModalService.showModal.next(false);
            const user = this.authService.user.getValue();
            this.authService.user.next({...user, isVerified : true});

        }, err => {

            this.showProcessing = false;
            this.showForm= false;
            this.showMessage = true;
            
            if(err.error?.body){
                this.message = err.error.body;
            }else{
                this.message = 'We are unable to process your request at this time.';
            }

        });

    }

    public closeModal(){
        this.emailVerificationModalService.showModal.next(false);
    }

}