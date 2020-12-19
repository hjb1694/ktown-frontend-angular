import { Component } from "@angular/core";
import { SideMenuService } from 'src/app/global-components/side-menu/side-menu.service';

@Component({
    selector : 'app-add-discussion-thread', 
    templateUrl : './add-discussion-thread.page.html', 
    styleUrls : ['./add-discussion-thread.page.scss']
})
export class AddDiscussionThreadPage{

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

    public openSideMenu(){

        this.sideMenuService.openSideMenu();

    }

}