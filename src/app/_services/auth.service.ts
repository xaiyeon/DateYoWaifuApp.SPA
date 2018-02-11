import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';
import { error } from 'selenium-webdriver';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {
    // location of our api
    baseURL = 'http://localhost:5000/api/auth/';
    // For our token
    userToken: any;
    currentUser: User;
    // For decoded token
    decodedToken: any;
    jwtHelper: JwtHelper = new JwtHelper();
    // this is for default image
    private photoUrl = new BehaviorSubject<string>('../../assets/images/user_def.gif');
    curPhotoUrl = this.photoUrl.asObservable();


constructor( private http: Http ) { }

    // For changing the profile photo
    changeMemberPhoto(photoUrl: string) {
        this.photoUrl.next(photoUrl);
    }


    login(model: any) {
        return this.http.post(this.baseURL + 'login', model, this.requestOption()).map((response: Response) => {
            const user = response.json();
            if (user && user.tokenString) {
                localStorage.setItem('token', user.tokenString);
                localStorage.setItem('user', JSON.stringify(user.user));
                // decode token
                this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
                // for photo
                this.currentUser = user.user;
                this.userToken = user.tokenString;

                if (this.currentUser.profileImageURL !== null) {
                    // changing photo
                    this.changeMemberPhoto(this.currentUser.profileImageURL);
                } else {
                    this.changeMemberPhoto('../../assets/images/user_def.gif');
                }

            }
        } ).catch(this.handleError);
        // Now we want to store this token to local storage, because that's what we get.
    }

    // The register method
    register(user: User) {
        return this.http.post(this.baseURL + 'register', user, this.requestOption()).catch(this.handleError);

    }

    // A logged-in method from Lecture 54
    loggedIn() {
        return tokenNotExpired('token');
    }

    // Because that's our API is using json
    private requestOption() {
        const headers = new Headers({'Content-type': 'application/json'});
        return new RequestOptions({headers: headers});
    }

    // For handling errors returned from our server
    // Not sure what's happening here...
    private handleError(Aerror: any) {
        const applicationError = Aerror.headers.get('Application-Error');
        if (applicationError) {
            return Observable.throw(applicationError);
        }
        const serverError = Aerror.json();
        let modelStateErrors = '';
        if (serverError) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }
        return Observable.throw(
            modelStateErrors || 'Server Error'
        );


    }

}

