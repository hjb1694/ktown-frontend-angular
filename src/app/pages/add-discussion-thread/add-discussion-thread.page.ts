import { Component } from "@angular/core";
import { SideMenuService } from 'src/app/global-components/side-menu/side-menu.service';

@Component({
    selector : 'app-add-discussion-thread', 
    templateUrl : './add-discussion-thread.page.html', 
    styleUrls : ['./add-discussion-thread.page.scss']
})
export class AddDiscussionThreadPage{

    editorStyles = {
        height : '200px'
    }

    constructor(
        private sideMenuService: SideMenuService
    ){}

    public openSideMenu(){

        this.sideMenuService.openSideMenu();

    }

}