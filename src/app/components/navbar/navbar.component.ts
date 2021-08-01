import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean = false;
  loggedInUser:string|null = '';
  showRegister?: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingsService:SettingsService
  ) { }

  ngOnInit() {
    console.log("navbar oninit");
    this.authService.getAuth().subscribe(auth => {
      console.log("navbar getauth");
      if(auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.showRegister = this.settingsService.getSettings().allowRegistration;

  }

  logout(){
    this.authService.logout().then(()=>{
      this.flashMessage.show("You have been successfully logged off",{
        cssClass: 'alert-success',
        timeout: 3000
      });
      this.router.navigate(['/login']);
    })
    
  }

}
