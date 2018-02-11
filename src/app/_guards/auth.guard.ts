import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { AlertifyService } from '../_services/alertify.service';

// These are for protecting our URLs, we add as provider and use in Routes file

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  // This basically checks if are person is logged in or not
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.alertify.error('MASTER! You need to log-in...');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
