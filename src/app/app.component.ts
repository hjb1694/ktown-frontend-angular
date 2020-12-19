import { Component, OnInit } from '@angular/core';
import { AutoLogoutWarningService } from './global-components/auto-logout-warning/auto-logout-warning.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public showLogoutWarning: boolean = false;

  constructor(
    private authService: AuthService, 
    private autoLogoutWarningService: AutoLogoutWarningService
  ){}

  ngOnInit(){
    this.authService.autoLogin();

    this.autoLogoutWarningService.showModal.subscribe(value => {
      this.showLogoutWarning = value;
    });

  }

}
