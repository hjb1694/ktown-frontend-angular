import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AutoLogoutWarningService{

    public showModal = new BehaviorSubject(false);

}