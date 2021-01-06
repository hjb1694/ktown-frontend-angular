import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { SideMenuService } from 'src/app/global-components/side-menu/side-menu.service';
import { CustomValidators } from '../../custom-validators/text-validators';

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
    editorStyles = {
        height : '35rem'
    }
    public topics = [
        'New to Knoxville', 
        'Tourism', 
        'Campus Life', 
        'Community + Social', 
        'Lifestyle', 
        'Recipes + Cooking', 
        'Style + Trends', 
        'Art + Music', 
        'Dating Scene', 
        'Outdoors', 
        'Prospective Residents', 
        'Activities + Events', 
        'Politics', 
        'Local Sports', 
        'Religion + Church', 
        'Career + Education', 
        'General'
    ]

    constructor(
        private sideMenuService: SideMenuService
    ){}

    ngOnInit(){
        this.addDiscussionForm = new FormGroup({
            headline : new FormControl('', []), 
            topic : new FormControl('', []), 
            details : new FormControl('', [
                CustomValidators.minLength(40)
            ])
        });
    }

    public openSideMenu(){

        this.sideMenuService.openSideMenu();

    }

    public displayPreview(){
        this.removeExcessNewlines();
        this.showForm = false;
        this.showPreview = true;
    }

    removeExcessNewlines(){

        const currentHTML = this.addDiscussionForm.get('details').value;

        let newHTML = currentHTML.replace(/<p><br><\/p>/g, '\n');
        newHTML = newHTML.replace(/\n{3,}/g, '\n\n');

        console.log('newHTML: ', newHTML);

        this.addDiscussionForm.get('details').patchValue(newHTML);

    }

}