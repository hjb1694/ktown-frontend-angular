import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HomePageModule} from './pages/home/home.module';
import {ProfilePageModule} from './pages/profile/profile.module';
import {EditProfilePageModule} from './pages/edit-profile/edit-profile.module';

import {SideMenuModule} from './global-components/side-menu/side-menu.module';
import {LoginRegisterModalModule} from './global-components/login-register-modal/login-register-modal.module';
import {EmailVerificationModalModule} from './global-components/email-verification-modal/email-verification-modal.module';
import {AlertComponent} from './global-components/alert/alert.component';
import {AutoLogoutWarningComponent} from './global-components/auto-logout-warning/auto-logout-warning.component';

import { HttpClientModule } from '@angular/common/http';

import {QuillModule} from 'ngx-quill';


@NgModule({
  declarations: [
    AppComponent, 
    AlertComponent, 
    AutoLogoutWarningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HomePageModule, 
    ProfilePageModule,
    EditProfilePageModule,
    SideMenuModule,
    LoginRegisterModalModule, 
    EmailVerificationModalModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
