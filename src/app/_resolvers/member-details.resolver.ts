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
export class MemberDetailsResolver implements Resolve<User> {
    
    constructor(private userservice: UserService, private router: Router, 
        private alertiy: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userservice.getUser(route.params['id'])
        .catch(error => {
            this.alertiy.error('Master, Master, where is the data?');
            this.router.navigate(['/members']);
            return Observable.of(null);
        });
    }

}
