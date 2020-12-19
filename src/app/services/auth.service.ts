import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {DateTime} from 'luxon';
import { AutoLogoutWarningService } from '../global-components/auto-logout-warning/auto-logout-warning.service';
const { apiUrl } = environment;


@Injectable({
    providedIn : 'root'
})
export class AuthService{

    public user = new BehaviorSubject(null);
    private logoutInterval: any;
    private logoutWarningInterval: any;

    constructor(
        private http: HttpClient, 
        private router: Router, 
        private autoLogoutWarningService: AutoLogoutWarningService
    ){}

    public register(sendData): Observable<any> {

        return this.http.post(`${apiUrl}/auth/register`, sendData).pipe(
            catchError(err => {
                return throwError(err);
            }),
            tap((resp: any) => {
                this.user.next(resp.body);
                sessionStorage.setItem('user', JSON.stringify(resp.body));
            })
        );

    }

    public setAutoLogoutTimer(milliseconds: number): void {
        const classThis = this;
        this.logoutInterval = setInterval(() => {
            classThis.logout();
        }, milliseconds);
    }

    public setLogoutWarningTimer(milliseconds: number): void {
        const classThis = this;
        this.logoutWarningInterval = setInterval(() => {
                classThis.autoLogoutWarningService.showModal.next(true);
        }, milliseconds);
    }


    public login(sendData): Observable<any> {

        return this.http.post(`${apiUrl}/auth/login`, sendData).pipe(
            catchError(err => {
                return throwError(err);
            }),
            tap((resp: any) => {
                this.logoutInterval && clearInterval(this.logoutInterval);
                const sessionStartDateTime = new Date();
                const userObj = {...resp.body, sessionStartDateTime}
                this.user.next(userObj);
                sessionStorage.setItem('user', JSON.stringify(userObj));
                this.setAutoLogoutTimer(1000 * 60 * 59 /* 59 minutes */);
                this.setLogoutWarningTimer(1000 * 60 * 54);
            })
        );

    }

    public logout(redirect: boolean = true): void{
        this.user.next(null);
        sessionStorage.clear();
        clearInterval(this.logoutWarningInterval);
        this.autoLogoutWarningService.showModal.next(false);
        redirect && this.router.navigateByUrl('/');
    }

    public autoLogin(): void{

        const userJSON = sessionStorage.getItem('user');

        if(userJSON){

            const userObj = JSON.parse(userJSON);

            const { sessionStartDateTime } = userObj;

            const curDateTime = DateTime.fromJSDate(new Date());
            const luxSessionStartDateTime = DateTime.fromJSDate(new Date(sessionStartDateTime));

            const diffMs = curDateTime.diff(luxSessionStartDateTime).toObject().milliseconds;

            const fiftyNineMinMs = 1000 * 60 * 59;

            const msLeftTillExpire = fiftyNineMinMs - diffMs;

            console.log('Ms left till expire: ', msLeftTillExpire);

            if(msLeftTillExpire > 0){
                this.setAutoLogoutTimer(msLeftTillExpire);
                if(msLeftTillExpire > (1000 * 60 * 5)){
                    this.setLogoutWarningTimer(msLeftTillExpire - (1000 * 60 * 5));
                }else{
                    this.autoLogoutWarningService.showModal.next(true);
                }
                this.user.next(userObj);
            }else{
                this.logout();
            }

        }

    }

    public refreshLogin(): Observable<any> {

        return this.http.post(`${apiUrl}/auth/refresh-login`, {}, {
            headers : { 
                'authorization' : `Bearer ${this.user.getValue().token}`
            }
        }).pipe(
            catchError(err => {
                return throwError(err);
            }),
            tap((resp: any) => {
                this.logoutInterval && clearInterval(this.logoutInterval);
                this.logoutWarningInterval && clearInterval(this.logoutWarningInterval);
                const sessionStartDateTime = new Date();
                const userObj = {...resp.body, sessionStartDateTime}
                this.user.next(userObj);
                sessionStorage.setItem('user', JSON.stringify(userObj));
                this.setAutoLogoutTimer(1000 * 60 * 59 /* 59 minutes */);
                this.setLogoutWarningTimer(1000 * 60 * 54);
            })
        );

    }


}