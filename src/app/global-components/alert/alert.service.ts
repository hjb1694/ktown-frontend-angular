import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn : 'root'
})
export class AlertService{

    public showAlert: BehaviorSubject<{color : 'red' | 'green', content: string}> = new BehaviorSubject(null);

}