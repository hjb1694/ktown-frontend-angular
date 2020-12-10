import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn : 'root'
})
export class EmailVerificationModalService{

    public showModal = new BehaviorSubject<boolean>(false);

}