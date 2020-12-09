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

    private _user = new BehaviorSubject(null);

    constructor(
        private http: HttpClient
    ){}

    public get user(){
        return this._user.getValue();
    }

    public register(sendData): Observable<any> {

        return this.http.post(`${apiUrl}/auth/register`, sendData).pipe(
            catchError(err => {
                return throwError(err);
            }),
            tap(resp => {
                console.log(resp);
                this._user.next(resp);
            })
        );

    }


}