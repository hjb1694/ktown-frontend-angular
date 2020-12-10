import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const { apiUrl } = environment;


@Injectable({
    providedIn : 'root'
})
export class AuthService{

    public user = new BehaviorSubject(null);

    constructor(
        private http: HttpClient
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


    public login(sendData){

        return this.http.post(`${apiUrl}/auth/login`, sendData).pipe(
            catchError(err => {
                return throwError(err);
            }),
            tap((resp: any) => {
                this.user.next(resp.body);
                sessionStorage.setItem('user', JSON.stringify(resp.body));
            })
        );;

    }

    public logout(){
        this.user.next(null);
        sessionStorage.clear();
    }

    public autoLogin(){

        const userJSON = sessionStorage.getItem('user');

        if(userJSON){
            this.user.next(JSON.parse(userJSON));
        }

    }


}