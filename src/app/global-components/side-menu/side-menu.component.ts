import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SideMenuService } from './side-menu.service';

@Component({
    selector : 'app-side-menu', 
    templateUrl : './side-menu.component.html', 
    styleUrls : ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit{
    public isOpen: boolean = false;
    public user = null;
    public navLinks = [
        {
            title : 'Discussions', 
            img : '', 
            link : '#'
        },
        {
            title : 'Dining', 
            img : '', 
            link : '#'
        },
        {
            title : 'Shopping', 
            img : '', 
            link : '#'
        },
        {
            title : 'Coupons + Deals', 
            img : '', 
            link : '#'
        },
        {
            title : 'Job Listings', 
            img : '', 
            link : '#'
        },
        {
            title : 'Guides', 
            img : '', 
            link : '#'
        }
    ];
    @ViewChild('sideMenu') sideMenu: ElementRef;
    @ViewChild('sideMenuMain') sideMenuMain: ElementRef;

    constructor(
        private renderer: Renderer2, 
        private sideMenuService: SideMenuService, 
        private authService: AuthService, 
        private router: Router
    ){}

    ngOnInit(){

        this.sideMenuService.sideMenuIsOpen.subscribe(value => this.isOpen = value);
        this.authService.user.subscribe(value => this.user = value);

    }

    ngAfterViewInit(){

        this.renderer.listen(this.sideMenu.nativeElement, 'click', e => {
            this.sideMenuService.closeSideMenu();
        });

        this.renderer.listen(this.sideMenuMain.nativeElement, 'click', e => {
            e.stopImmediatePropagation();
        });

    }

    public logout(): void{
        this.authService.logout();
        this.sideMenuService.closeSideMenu();
    }

    public goToProfile(){
        this.router.navigate(['/profile/user', this.authService.user.getValue().username]);
        this.sideMenuService.closeSideMenu();
    }
}