import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector : 'app-register-form-briefing', 
    templateUrl : './briefing.component.html', 
    styleUrls : ['./briefing.component.scss']
})
export class RegisterFormBriefingComponent{

    public briefingListItems: string[] = [
        'Earn points for participation. Redeem those points for rewards.', 
        'Share your knowelege and experience with others.', 
        'Meet and engage with others around the area.', 
        'Share your insights with visitors and prospective residents of Knoxville/Knox County.', 
        'Level up and earn badges along the way!'
    ];

    @Output() public nextBtnClicked: EventEmitter<any> = new EventEmitter();

    public goToPartOne(){
        this.nextBtnClicked.emit(true);
    }

}