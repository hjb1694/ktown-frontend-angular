import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SideMenuService } from 'src/app/global-components/side-menu/side-menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
    selector : 'app-discussion-thread-page', 
    templateUrl : './discussion-thread.page.html', 
    styleUrls : ['./discussion-thread.page.scss']
})
export class DiscussionThreadPage implements OnInit{

    public topics: any = [];
    public thread: any;
    public replies: any = [];
    public threadLoading: boolean = true;
    public repliesLoading: boolean = true;
    public threadId: string;
    private determineActionsSubscription: Subscription;
    public isLoggedIn: boolean;

    constructor(
        private crudService: CrudService,
        private route: ActivatedRoute, 
        private authService: AuthService
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
            this.determineActionsForReplies();
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            this.repliesLoading = false;
        });
    }

    private determineActionsForReplies(): void {

        this.determineActionsSubscription = this.authService.user.subscribe(user => {

            if(user){

                this.isLoggedIn = true;

                if(this.replies.length){

                    const replyIds = this.replies.map(reply => reply.replyId);

                    this.crudService.post(
                        'discussions/actions-for-replies', 
                        {replyIds}, 
                        true
                    )
                    .toPromise()
                    .then((resp: any) => {
                        const actions = resp.body.actions;
                        let repliesTmp = [...this.replies];
    
                        for(let action of actions){
                            for(let reply of repliesTmp){
                                console.log(reply.replyAuthorId);
                                if(reply.replyAuthorUsername == user.username){
                                    reply.actions = null;
                                }else{
                                    if(action.replyId == reply.replyId){
                                        reply.actions = action;
                                    }
                                } 
                            }
                        }

                        this.replies = repliesTmp;

                        console.log(this.replies);
    
                    })
                    .catch(err => {
                        console.error(err);
                    });

                }
                
            }else{
                this.replies = this.replies.map(reply => {
                    return {...reply, actions : null};
                });
                this.isLoggedIn = false;
            }

        });

    }

    public toggleDropdown(dropdown: HTMLUListElement): void{

        dropdown.style.display = dropdown.style.display == 'block' ? 'none' : 'block';

    }

    public addLikeOrDislike(replyId: number, action: string, dropdown: HTMLUListElement): void {

        dropdown.style.display = 'none';

        this.crudService.post(
            'discussions/add-like-or-dislike', 
            {replyId, action}, 
            true
        ).toPromise()
        .then(() => {
            const replyObj = this.replies.filter(reply => reply.replyId == replyId);

            console.log(replyObj);

            replyObj[0].actions.canLikeOrDislike = false;
            replyObj[0].actions.likeOrDislikeAction = action;

            if(action === 'like'){
                replyObj[0].likeCount++;
            }else if(action === 'dislike'){
                replyObj[0].dislikeCount++;
            }

        })
        .catch(err => {
            console.error(err);
        })


    }

}