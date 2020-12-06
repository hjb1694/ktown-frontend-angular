import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HomePageModule} from './pages/home/home.module';
import {SideMenuModule} from './global-components/side-menu/side-menu.module';
import {LoginRegisterModalModule} from './global-components/login-register-modal/login-register-modal.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HomePageModule, 
    SideMenuModule,
    LoginRegisterModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
