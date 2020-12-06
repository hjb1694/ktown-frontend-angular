import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { SideMenuService } from './side-menu.service';

@Component({
    selector : 'app-side-menu', 
    templateUrl : './side-menu.component.html', 
    styleUrls : ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit{
    public isOpen: boolean = false;
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
    ];
    @ViewChild('sideMenu') sideMenu: ElementRef;
    @ViewChild('sideMenuMain') sideMenuMain: ElementRef;

    constructor(
        private renderer: Renderer2, 
        private sideMenuService: SideMenuService
    ){}

    ngOnInit(){

        this.sideMenuService.sideMenuIsOpen.subscribe(value => this.isOpen = value);

    }

    ngAfterViewInit(){

        this.renderer.listen(this.sideMenu.nativeElement, 'click', e => {
            this.sideMenuService.closeSideMenu();
        });

        this.renderer.listen(this.sideMenuMain.nativeElement, 'click', e => {
            e.stopImmediatePropagation();
        });

    }
}