import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'selenium-webdriver';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { GlobalDataService } from '../_services/global-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  
  // Our service is used to monitor the toggling of the register component
  registerToggle: boolean = false;

  photoUrl: string;

  constructor(private globalDataService: GlobalDataService, public authService: AuthService, private alertify: AlertifyService,
    private router: Router) {


   }

  ngOnInit() {
    // For our register toggle
    this.globalDataService.currentRegisterMode.subscribe(registerToggle => this.registerToggle = registerToggle);
    this.authService.curPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  // Now we create a function to change the boolean value for our resgisterToggle variable
  registerToggleClick() {
    this.registerToggle = !this.registerToggle;
    this.globalDataService.changeRegisterMode(this.registerToggle);
  }

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(data => {
    this.alertify.success('Master! You actually logged in~');
      // I called it Aerror, b/c name shadowing
    }, error => {
      this.alertify.error('Master, you FAILED to login.');
    }, // the complete 
      () => {
        this.router.navigate(['/waifus']);
      }  );
  }

  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.alertify.message('Master... Why did you leave so soon! :(');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    // returns true or false and checks token
    return this.authService.loggedIn();
    // const token = localStorage.getItem('token');
    // return !!token;
  }

}
