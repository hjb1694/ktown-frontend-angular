import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import domParser from 'dom-parser';

const parser = new DOMParser();

export default class DiscussionsValidators{

    static imageLimit(
        limit: number = 3
    ): ValidatorFn {

        return (control: AbstractControl): ValidationErrors => {

            const doc = parser.parseFromString(control.value, 'text/html');

            const images = doc.querySelectorAll('img');

            console.log('image tag count: ', images.length);

            if(images.length > limit) return {invalidImgCount : true}

            return null;
        }

    }

}