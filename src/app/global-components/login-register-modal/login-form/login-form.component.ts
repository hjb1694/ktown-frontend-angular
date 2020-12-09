import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector : 'app-login-form', 
    templateUrl : './login-form.component.html', 
    styleUrls : ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{

    public loginForm: FormGroup;

    constructor(){}

    ngOnInit(){
        this.loginForm = new FormGroup({
            email : new FormControl(''), 
            password : new FormControl('')
        });
    }

}