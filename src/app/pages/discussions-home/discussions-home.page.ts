import { Component, OnInit } from '@angular/core';
import { SideMenuService } from 'src/app/global-components/side-menu/side-menu.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
    selector : 'app-discussions-home-page', 
    templateUrl : './discussions-home.page.html', 
    styleUrls : ['./discussions-home.page.scss']
})
export class DiscussionsHomePage implements OnInit{

    public initialThreadsAreLoading: boolean = true;
    public threads: any = [];
    private offset = 10;
    public topics: string[] = [];

    constructor(
        private sideMenuService: SideMenuService, 
        private crudService: CrudService
    ){}

    ngOnInit(){

        this.fetchInitialThreads();
        this.fetchTopics();

    }


    private fetchInitialThreads(): void{

        this.crudService.get('discussions/threads?offset=0')
        .toPromise()
        .then((resp: any) => {
            console.log(resp);
            this.threads = resp.body.threads;
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            this.initialThreadsAreLoading = false;
        });

    }

    private fetchTopics(): void{
        this.crudService.get('discussions/discussions-topics')
        .subscribe((resp: any) => {
            this.topics = resp.body;
        }, err => {
            console.error(err);
        });
    }

    public openSideMenu(): void{

        this.sideMenuService.openSideMenu();

    }

}