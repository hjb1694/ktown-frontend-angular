import { typeWithParameters } from '@angular/compiler/src/render3/util';
import {Component, OnInit} from '@angular/core';
import { AlertService } from './alert.service';

@Component({
    selector : 'app-alert', 
    templateUrl : './alert.component.html', 
    styleUrls : ['./alert.component.scss']
})
export class AlertComponent implements OnInit{
    public content: string;
    public bgColor: 'green' | 'red';
    public showAlert: boolean = false;
    public timeout: any;

    constructor(
        private alertService: AlertService
    ){}

    ngOnInit(){

        this.alertService.showAlert.subscribe(value => {
            if(value){
                clearTimeout(this.timeout);

                this.showAlert = true;
                this.bgColor = value.color;
                this.content = value.content;

                this.timeout = setTimeout(() => {
                    this.alertService.showAlert.next(null);
                },3500);
            }else{
                this.showAlert = false;
                this.bgColor = null;
                this.content = null;
            }
        });

    }


}