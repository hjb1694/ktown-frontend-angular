import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SideMenuService } from 'src/app/global-components/side-menu/side-menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';


@Component({
    selector : 'app-profile', 
    templateUrl : './profile.page.html', 
    styleUrls : ['./profile.page.scss']
})
export class ProfilePage implements OnInit{


    public isLoading: any = {
        main : true, 
        about : true
    }
    public fetchErrorMsg = {
        main : null, 
        about : null
    }
    public userName: string;
    public isOwnProfile: boolean = false;
    public showActionDropdown: boolean = false;
    public showBadge: boolean = false;
    public showActions: any = {
        editProfile : false, 
        followUser : false, 
        unfollowUser : false,
        undoFollowRequest : false,
        blockUser : false, 
        unblockUser : false, 
        reportUser : false
    }
    public profileData: any = {
        main : null, 
        about : null
    };
    public showAboutData: boolean = false;
    public profileMessages: any = {
        showDeactivated : false, 
        showOwnPrivate : false, 
        showPrivate: false
    }
    public showOpts: boolean = false;
    private loggedInUser: any;
    private loggedInUserRole: number;

    constructor(
        private sideMenuService: SideMenuService, 
        private route: ActivatedRoute, 
        private authService: AuthService, 
        private crudService: CrudService
    ){}

    ngOnInit(){

        this.route.params.subscribe((params: Params) => {
            this.fetchErrorMsg.main = null;
            this.userName = params['username']; 
            this.fetchMainProfileData();

            
        });

    }


    private fetchMainProfileData(): void {

        this.crudService.get(`profile/main-profile-data/${this.userName}`)
        .subscribe((resp: any) => {

            this.profileData.main = resp.body;

            if(+this.profileData.main.status > 3){
                this.profileMessages.showDeactivated = true;
            }else{

                if(this.profileData.main.role && this.profileData.main.role > 1){
                    this.showBadge = true;
                }else{
                    this.showBadge = false;
                }

                this.listenForUser();
            }

        }, err => {
            console.error(err);

            if(err.error?.errorShortText === 'ERR_NO_USER_EXISTS'){
                this.fetchErrorMsg.main = 'No user with this username exists.';
            }else{
                this.fetchErrorMsg.main = 'There was an issue fetching the profile.';
            }

        }).add(() => {
            this.isLoading.main = false;
        });


    }


    private listenForUser(){

        this.authService.user.subscribe(user => {

           if(!user){

                this.loggedInUser = null;
                this.loggedInUserRole = null;

                if(this.profileData.main.isPrivateProfile){
                    this.profileMessages.showPrivate = true;
                }else{
                    this.fetchProfileAboutDataNoAuth();
                }

                this.showActionDropdown = false;

           }else{
                this.loggedInUser = user;

                this.fetchProfileAboutDataWithAuth();
                this.fetchLoggedInUserRole();

           }

        });

    }


    private fetchLoggedInUserRole(){
        this.crudService.get('auth/logged-in-user-role', true)
        .subscribe((resp: any) => {
            console.log(resp.body);
            this.loggedInUserRole = resp.body;
            this.determineActionDropdownContent();  
        }, err => {
            console.error(err);
        });
    }

    private fetchProfileAboutDataNoAuth(): void {

        this.crudService.get(`profile/about-profile-data-no-auth/${this.profileData.main.userId}`)
        .subscribe((resp: any) => {

            this.profileData.about = resp.body;
            this.showAboutData = true;

        }, err => {
            console.error(err);
        })

    }

    private fetchProfileAboutDataWithAuth(): void {
        this.showAboutData = false;

        this.crudService.get(`profile/about-profile-data-auth-user/${this.profileData.main.userId}`, true)
        .subscribe((resp: any) => {

            if(resp.body.canShow){

                this.profileData.about = resp.body;
                this.showAboutData = true;
                this.profileMessages.showPrivate = false;

                if(this.profileData.main.isPrivateProfile && (this.userName = this.loggedInUser?.username)){
                    this.profileMessages.showOwnPrivate = true;
                }else{
                    this.profileMessages.showOwnPrivate = false;
                }

            }else{

                this.showAboutData = false;
                this.profileMessages.showPrivate = true;

            }

        }, err => {
            console.error(err);
        });

    }

    private determineActionDropdownContent(){

        if(this.userName === this.loggedInUser?.username){
            this.showActions.editProfile = true;
            for(let item of Object.keys(this.showActions)){
                if(item !== 'editProfile'){
                    this.showActions[item] = false;
                }
            }
            this.showActionDropdown = true;
        }else{

            this.showActions.editProfile = false;
            this.showActionDropdown = false;

            this.crudService.get(`social/status-between-users/${this.profileData.main.userId}`, true)
            .subscribe((resp: any) => {

                console.log('statuses between users: ', resp);

                this.showActions.reportUser = (+this.profileData.main.role < 5 && this.loggedInUserRole < 5);
              
                this.showActions.blockUser = (+this.profileData.main.role < 5 && resp.body.hasBlockedUser === false && this.loggedInUserRole < 5);
                

                this.showActions.unblockUser = resp.body.hasBlockedUser === true;
                

                if(
                    resp.body.hasBlockedUser === false && 
                    resp.body.blockedByOtherUser === false
                ){

                    if(resp.body.isFollowingUser === false && resp.body.followRequestPending === false){
                        this.showActions.followUser = true;
                    }else{
                        this.showActions.followUser = false;
                    }

                }else{
                    this.showActions.followUser = false;
                    this.showActions.unfollowUser = false;
                }


            }, err => {
                console.error(err);
            }).add(() => {
                for(let key of Object.keys(this.showActions)){
                    if(this.showActions[key]){
                        this.showActionDropdown = true;
                        break;
                    }
                }
            });



        }

    }

    
    public openSideMenu(){

        this.sideMenuService.openSideMenu();

    }

    public toggleOpts(){
        this.showOpts = !this.showOpts;
    }

}