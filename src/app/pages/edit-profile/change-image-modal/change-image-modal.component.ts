import {Component, EventEmitter, Output} from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CrudService } from 'src/app/services/crud.service';

@Component({
    selector : 'app-change-image-modal', 
    templateUrl : './change-image-modal.component.html', 
    styleUrls : ['./change-image-modal.component.scss']
})
export class ChangeImageModalComponent{

    @Output() modalClose = new EventEmitter();

    public imageChangedEvent: any;
    public showImageSelectors: boolean = true;
    public showCropper: boolean = false;
    public showCropAndSaveBtn: boolean = false;
    public croppedImage: any;
    public showLoading: boolean = false;
    public showCloseBtn: boolean = true;

    constructor(
        private crudService: CrudService
    ){}

    public fileChange(event: any): void {
        this.imageChangedEvent = event;
        this.showImageSelectors = false;
        this.showCropper = true;
    }

    public imageLoaded(){
        this.showCropAndSaveBtn = true;
    }

    public imageCropped(event: ImageCroppedEvent){
        this.croppedImage = event.base64;
    }

    public save(){
        this.showCropper = false;
        this.showLoading = true;
        this.showCloseBtn = false;

        this.crudService.post(
            'profile/upload-new-profile-img', 
            {image : this.croppedImage}, 
            true
        )
        .subscribe((resp: any) => {

            console.log(resp);

        }, err => {
            console.error(err);
        });
    }

    public closeModal(){
        this.modalClose.emit(true);
    }
}