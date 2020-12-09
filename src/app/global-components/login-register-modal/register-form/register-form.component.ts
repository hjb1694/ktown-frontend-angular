import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import {CustomValidators} from '../../../custom-validators/text-validators';

@Component({
    selector : 'app-register-form', 
    templateUrl : './register-form.component.html', 
    styleUrls : ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit{
    public showBriefing: boolean = true;
    public showPartOne: boolean = false;
    public showPartTwo: boolean = false;
    public registerForm: FormGroup;
    public years: number[] = [];
    public errMsgs = {
        partOne : [], 
        partTwo : []
    }

    ngOnInit(){

        this.registerForm = new FormGroup({
            birthMonth : new FormControl('', [
                Validators.required
            ]), 
            birthDay : new FormControl('', [
                Validators.required
            ]),
            birthYear : new FormControl('', [
                Validators.required
            ]), 
            email : new FormControl('', [
                CustomValidators.isValidEmail
            ]), 
            username : new FormControl('', [
                Validators.pattern(/^[A-Z0-9]{8,15}$/i)
            ]), 
            password : new FormControl('', [
                CustomValidators.isValidPassword
            ]), 
            confirmPassword : new FormControl('')
        });

        this.generateBirthYears();

    }

    private validatePartOne(): boolean{
        this.errMsgs.partOne = [];
        let isValid: boolean = true;

        try{

            const birthMonth = this.registerForm.get('birthMonth');
            const birthDay = this.registerForm.get('birthDay');
            const birthYear = this.registerForm.get('birthYear');
    
            if(birthMonth.invalid || birthDay.invalid || birthYear.invalid){
                throw new Error('Please enter a valid date of birth.');
            }
    
            const birthDate = DateTime.fromFormat(`${birthMonth.value}-${birthDay.value}-${birthYear.value}`,'MM-dd-yyyy');
            const curDate = DateTime.local();
    
            if(!birthDate.isValid){
                throw new Error('Please enter a valid date of birth.');
            }

            if(curDate.diff(birthDate, 'years').values.years < 13){
                throw new Error('You must be at least 13 to join.');
            }

        }catch(e){
            isValid = false;
            this.errMsgs.partOne.push(e.message);
        }finally{
            return isValid
        }
    }

    private validatePartTwoField(field: string, message: string): void{
        this.registerForm.get(field).invalid && this.errMsgs.partTwo.push(message);
    }


    private validatePartTwo(): boolean {
        this.errMsgs.partTwo = [];
        let isValid: boolean = true;

        this.validatePartTwoField('email', 'Please enter a valid email address.');
        this.validatePartTwoField('username', 'Username must contain only letters and numbers');
        this.validatePartTwoField('password', 'Password must contain be between 8 to 15 characters and have at least (1) uppercase letter, (1) lowercase letter, and (1) number.');

        if(this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value){
            this.errMsgs.partTwo.push('Confirm password does not match password.');
        }

        if(this.errMsgs.partTwo.length) isValid = false;
        return isValid;
    }

    public goToPartOne(): void{
        this.showBriefing = false;
        this.showPartOne = true;
    }

    public goToPartTwo(): void{
        if(!this.validatePartOne()) return;
        this.showPartOne = false;
        this.showPartTwo = true;
    }

    public submitForm(): void {
        if(!this.validatePartTwo) return;
        console.log('passed.');
    }

    public generateBirthYears(): void{

        let curYear = (new Date()).getFullYear();

        for(let i = curYear; i > curYear - 100; i--){
            this.years.push(i);
        }

    }
}