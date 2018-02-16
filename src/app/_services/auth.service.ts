// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';
import { error } from 'selenium-webdriver';
import { Observable } from 'rxjs/Observable';
// import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUser } from '../_models/authUser';


@Injectable()
export class AuthService {
    // location of our api
    baseURL = 'http://localhost:5000/api/auth/';
    // For our token
    userToken: any;
    currentUser: User;
    // For decoded token
    decodedToken: any;
    // jwtHelper: JwtHelper = new JwtHelper();
    // this is for default image
    private photoUrl = new BehaviorSubject<string>('../../assets/images/user_def.gif');
    curPhotoUrl = this.photoUrl.asObservable();


constructor( private http: HttpClient, private jwthelperservice: JwtHelperService ) { }

    // For changing the profile photo
    changeMemberPhoto(photoUrl: string) {
        this.photoUrl.next(photoUrl);
    }


    login(model: any) {
        return this.http.post<AuthUser>(this.baseURL + 'login', model, { headers: new HttpHeaders()
            .set('Content-Type', 'application/json')})
            .map(user => {
            // const user = response.json();
            if (user && user.tokenString) {
                localStorage.setItem('token', user.tokenString);
                localStorage.setItem('user', JSON.stringify(user.user));
                // decode token
                this.decodedToken = this.jwthelperservice.decodeToken(user.tokenString);
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
        } );
        // Now we want to store this token to local storage, because that's what we get.
    }

    // The register method
    register(user: User) {
        // return this.http.post(this.baseURL + 'register', user, this.requestOption()).catch(this.handleError);
        return this.http.post(this.baseURL + 'register', user, { headers: new HttpHeaders()
        .set('Content-Type', 'application/json')});
    }

    // A logged-in method from Lecture 54
    loggedIn() {
        const token = this.jwthelperservice.tokenGetter();
        if (!token) {
            return false;
        }
        return !this.jwthelperservice.isTokenExpired(token);
        // return tokenNotExpired('token');
    }

    // Because that's our API is using json, NOT USED anymore because we use HttpClient
    private requestOption() {
        const headers = new Headers({'Content-type': 'application/json'});
        // return new RequestOptions({headers: headers});
    }

}

