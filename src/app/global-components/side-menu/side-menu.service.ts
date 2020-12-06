import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn : 'root'
}) 
export class SideMenuService{

    public sideMenuIsOpen = new BehaviorSubject<boolean>(false);

    public openSideMenu(){
        this.sideMenuIsOpen.next(true);
    }

    public closeSideMenu(){
        this.sideMenuIsOpen.next(false);
    }

}