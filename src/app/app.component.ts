import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { OnInit } from '@angular/core';
// import { JwtHelper } from 'angular2-jwt';
import { User } from './_models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MyWaifuOnline';

  // JWT
  // jwtHelper: JwtHelper = new JwtHelper();


  constructor(private authService: AuthService, private jwthelperservice: JwtHelperService) {

  }


  ngOnInit() {
    const token = localStorage.getItem('token');
    // for photo
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (token) {
      this.authService.decodedToken = this.jwthelperservice.decodeToken(token);
    }

    if (user) {
      this.authService.currentUser = user;

      // Checking photo, maybe some way to make into a helper function?
      if (this.authService.currentUser.profileImageURL !== null ) {
        this.authService.changeMemberPhoto(user.profileImageURL);
      } else {
        this.authService.changeMemberPhoto('../assets/images/user_def.gif');
      }

      // this.authService.changeMemberPhoto(user.profileImageURL);
    }

  }

}

