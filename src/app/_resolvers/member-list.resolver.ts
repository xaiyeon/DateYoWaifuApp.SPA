import { Resolve } from "@angular/router";
import { User } from '../_models/User';
import { Injectable } from "@angular/core";
import { UserService } from "../_services/user.service";
import { Router } from "@angular/router";
import { AlertifyService } from "../_services/alertify.service";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/catch';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    // Pagination
    pageSize = 2;
    pageNumber = 1;

    
    constructor(private userservice: UserService, private router: Router, 
        private alertiy: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userservice.getUsers(this.pageNumber, this.pageSize)
        .catch(error => {
            this.alertiy.error('Master, Master, where is the data?');
            this.router.navigate(['/home']);
            return Observable.of(null);
        });
    }

}
