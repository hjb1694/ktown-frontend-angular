import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
const { apiUrl } = environment;

@Injectable({
    providedIn : 'root'
})
export class CrudService{

    constructor(
        private http: HttpClient, 
        private authService: AuthService
    ){}

    public post(path: string, body: object, requiresAuth: boolean = false){

        let headers = new HttpHeaders();

        if(requiresAuth){
            headers = headers.append('Authorization', this.authService.user.getValue().token);
        }

        return this.http.post(`${apiUrl}/${path}`, body, {headers});

    }


}