import {ValidationErrors, AbstractControl} from '@angular/forms';
import isEmail from 'is-email';
import stringLength from 'string-length';

export class CustomValidators{

    static isValidEmail(control: AbstractControl): ValidationErrors {
        if(!isEmail(control.value)){
            return {isValidEmail : false}
        }
        return null;
    }

    static isValidPassword(control: AbstractControl): ValidationErrors {
        const regs = {
            uppercase : /[A-Z]/, 
            lowercase : /[a-z]/, 
            number : /[0-9]/
        }

        if(
            !regs.uppercase.test(control.value) ||
            !regs.lowercase.test(control.value) ||
            !regs.number.test(control.value) || 
            stringLength(control.value) < 8
        ){
            return {isValidPassword : false}
        }

        return null;
    }

    static isValidUsername(control: AbstractControl): ValidationErrors {

        if(!/^[A-Z0-9]{6,12}$/i.test(control.value)){
            return {isValidUsername : false}
        }

        return null;

    }


}