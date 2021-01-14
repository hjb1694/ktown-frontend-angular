import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SideMenuService } from 'src/app/global-components/side-menu/side-menu.service';
import { CustomValidators } from '../../custom-validators/text-validators';
import DiscussionsValidators from '../../custom-validators/discussions-validators';
import { CrudService } from 'src/app/services/crud.service';

@Component({
    selector : 'app-add-discussion-thread', 
    templateUrl : './add-discussion-thread.page.html', 
    styleUrls : ['./add-discussion-thread.page.scss']
})
export class AddDiscussionThreadPage implements OnInit{

    @ViewChild('editor') editor;

    public addDiscussionForm: FormGroup;
    public showForm: boolean = true;
    public showPreview: boolean = false;
    public pageIsLoading: boolean = true;
    public pageHasLoadError: boolean = false;
    public formErrors: string[] = [];
    public formSubmissionIsProcessing: boolean = false;
    editorStyles = {
        height : '35rem'
    }
    public topics: string[];

    constructor(
        private sideMenuService: SideMenuService, 
        private crudService: CrudService
    ){}

    ngOnInit(){

        this.crudService.get('discussions/discussions-topics')
        .subscribe((resp: any) => {
            this.topics = resp.body;
            this.pageIsLoading = false;
        }, err => {
            console.error(err);
        });

        this.addDiscussionForm = new FormGroup({
            headline : new FormControl('', [
                CustomValidators.minLength(15)
            ]), 
            topic : new FormControl('', [
                Validators.required
            ]), 
            details : new FormControl('', [
                CustomValidators.minLength(50), 
                DiscussionsValidators.imageLimit()
            ])
        });
    }

    public openSideMenu(){

        this.sideMenuService.openSideMenu();

    }

    public validateForm(): void {

        this.formErrors = [];

        this.addDiscussionForm.get('headline').invalid && this.formErrors.push('Headline is too short.');
        this.addDiscussionForm.get('topic').invalid && this.formErrors.push('Please select a topic.');
        this.addDiscussionForm.get('details').hasError('minLenError') && this.formErrors.push('Details are too short.');
        this.addDiscussionForm.get('details').hasError('invalidImgCount') && this.formErrors.push('Only 3 images are allowed.');

        !this.formErrors.length && this.displayPreview();

    }

    public displayPreview(){
        this.removeExcessNewlines();
        this.showForm = false;
        this.showPreview = true;
    }

    public submitThread(){
        this.formSubmissionIsProcessing = true;

        this.crudService.post(
            'discussions/discussion-thread', 
            this.addDiscussionForm.value, 
            true
        ).subscribe((resp: any) => {

        }, err => {
            console.error(err);
        }).add(() => {
            this.formSubmissionIsProcessing = false;
        });


    }

    removeExcessNewlines(){

        const currentHTML = this.addDiscussionForm.get('details').value;

        let newHTML = currentHTML.replace(/<p><br \/><\/p>/g, '\n');
        newHTML = newHTML.replace(/\n{3,}/g, '\n\n');

        console.log('newHTML: ', newHTML);

        this.addDiscussionForm.get('details').patchValue(newHTML);

    }

}