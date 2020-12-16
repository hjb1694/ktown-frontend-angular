import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SideMenuService } from 'src/app/global-components/side-menu/side-menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { environment } from '../../../environments/environment';
const { assetsUrl } = environment;

@Component({
    selector : 'app-edit-profile', 
    templateUrl : './edit-profile.page.html', 
    styleUrls : ['./edit-profile.page.scss']
})
export class EditProfilePage implements OnInit{

    public isLoading: boolean = true;
    public isLoadError: boolean = false;
    public profileImg = '../../../assets/no-user.png';
    public profileData: any;
    public showImgEditModal: boolean = false;
    public aboutForm: FormGroup;

    constructor(
        private sideMenuService: SideMenuService, 
        private crudService: CrudService, 
        private authService: AuthService
    ){}

    ngOnInit(){
        this.fetchProfileImage();
        this.fetchProfileAboutData();

        this.aboutForm = new FormGroup({
            bio : new FormControl(''), 
            occupation : new FormControl(''), 
            location : new FormControl('')
        });

    }

    public openSideMenu(){

        this.sideMenuService.openSideMenu();

    }

    public closeModal(){
        this.showImgEditModal = false;
    }

    public displayImgEditModal(){
        this.showImgEditModal = true;
    }

    public imageLoadSuccessful(){
        this.showImgEditModal = false;
        this.fetchProfileImage();
    }

    private fetchProfileAboutData(){
        this.isLoading = true;
        this.isLoadError = false;
        this.crudService.get(`profile/about-profile-data-auth-user/${this.authService.user.getValue().userId}`, true)
        .subscribe((resp: any) => {
            console.log(resp);
            this.isLoading = false;
            this.profileData = resp.body;
        }, err => {
            console.error(err);
            this.isLoadError = true;
        });
    }

    private fetchProfileImage(){
        this.isLoading = true;
        this.isLoadError = false;
        this.crudService.get(`profile/main-profile-data/${this.authService.user.getValue().username}`)
        .subscribe((resp: any) => {
            this.isLoading = false;
            if(resp.body.profileImg){
                this.profileImg = `${assetsUrl}/public/uploads/profile-images/${resp.body.profileImg}.png`;
            }
        }, err => {
            console.error(err);
            this.isLoadError = true;
        });
    }


    public submitAboutForm(): void {
        
    }

}