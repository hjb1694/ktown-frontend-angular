import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SideMenuService } from 'src/app/global-components/side-menu/side-menu.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
    selector : 'app-discussion-thread-page', 
    templateUrl : './discussion-thread.page.html', 
    styleUrls : ['./discussion-thread.page.scss']
})
export class DiscussionThreadPage implements OnInit{

    public topics: any = [];
    public thread: any;
    public threadLoading: boolean = true;

    constructor(
        private crudService: CrudService, 
        private sideMenuService: SideMenuService, 
        private route: ActivatedRoute
    ){}

    ngOnInit(){

        this.fetchTopics();

        this.route.params.subscribe(params => {
            this.fetchThread(params['id']);
        });

    }

    private fetchTopics(): void {
        this.crudService.get('discussions/discussions-topics')
        .subscribe((resp: any) => {
            this.topics = resp.body;
        }, err => {
            console.error(err);
        });
    }

    private fetchThread(threadId: string): void {
        this.crudService.get(`discussions/thread/${threadId}`)
        .toPromise()
        .then((resp: any) => {
            this.thread = resp.body.thread;
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            this.threadLoading = false;
        });
    }

    public openSideMenu(): void{

        this.sideMenuService.openSideMenu();

    }

}