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
    public replies: any;
    public threadLoading: boolean = true;
    public repliesLoading: boolean = true;
    public threadId: string;

    constructor(
        private crudService: CrudService, 
        private sideMenuService: SideMenuService, 
        private route: ActivatedRoute
    ){}

    ngOnInit(){

        this.fetchTopics();

        this.route.params.subscribe(params => {
            this.threadId = params['id'];
            this.fetchThread();
            this.fetchReplies();
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

    private fetchThread(): void {
        this.crudService.get(`discussions/thread/${this.threadId}`)
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

    private fetchReplies(): void {
        this.crudService.get(`discussions/replies/${this.threadId}`)
        .toPromise()
        .then((resp: any) => {
            console.log(resp);
            this.replies = resp.body.replies;
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            this.repliesLoading = false;
        });
    }

    public openSideMenu(): void{

        this.sideMenuService.openSideMenu();

    }

}