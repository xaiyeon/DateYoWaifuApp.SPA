import { Resolve } from "@angular/router";
import { User } from '../_models/User';
import { Injectable } from "@angular/core";
import { UserService } from "../_services/user.service";
import { Router } from "@angular/router";
import { AlertifyService } from "../_services/alertify.service";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/catch';
import { Message } from "../_models/Message";
import { AuthService } from '../_services/auth.service';

// This is for Message.ts and UserMessages in API

@Injectable()
export class MemberMessagesResolver implements Resolve<Message[]> {
    // Pagination
    pageSize = 2;
    pageNumber = 1;

    messageContainer = 'Unread';

    constructor(private userservice: UserService, private router: Router, 
        private alertiy: AlertifyService, private authservice: AuthService,
        
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userservice.getUserMessages(this.authservice.decodedToken.nameid,
            this.pageNumber, this.pageSize, this.messageContainer)
        .catch(error => {
            this.alertiy.error('Master, Master, where is the data of messages?');
            this.router.navigate(['/home']);
            return Observable.of(null);
        });
    }

}
