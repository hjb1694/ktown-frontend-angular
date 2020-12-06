import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn : 'root'
})
export class LoginRegisterModalService{

    public showModal = new BehaviorSubject<boolean>(false);
    public showRegisterForm = new BehaviorSubject<boolean>(true);
    public showLoginForm = new BehaviorSubject<boolean>(false);

}