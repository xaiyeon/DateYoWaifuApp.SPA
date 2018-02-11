import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import { RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthHttp } from 'angular2-jwt';
// import 'rxjs/add/operator/throw';
import { PaginatedResult } from '../_models/pagination';

@Injectable()
export class UserService {
    baseUrl = environment.apiUrl;

    constructor(private authHttp: AuthHttp) { }

    // removed : Observable<User[]>
    getUsers(page?: number, itemsPerPage?: number, userParams?: any) {
        // pagination
        const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
        let userQueryString = '?';

        // Pretty bad way to build
        if (page != null && itemsPerPage != null) {
            // basically adding this to our Url
            userQueryString += 'pageNumber=' + page + 'pageSize=' + itemsPerPage + '&';
        }

        // More query building
        if (userParams != null) {
            userQueryString +=
            'minAge' + userParams.minAge +
            '&maxAge=' + userParams.maxAge +
            '&gender=' + userParams.gender +
            '&orderBy=' + userParams.orderBy;
        }

        // Now we are using authhttp instead of http we don't need private jwt and such
        // return this.authHttp.get(this.baseUrl + 'users', this.jwt())
        // .map(response => <User[]>response.json())
        // .catch(this.handleError)
        // ;
        return this.authHttp
        .get(this.baseUrl + 'users' + userQueryString)
        .map(response => {
            paginatedResult.result = response.json();
            // Check pagination headers
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }

            return paginatedResult;

        })
        .catch(this.handleError)
        ;

    }

    // This is a method for getting one user for detailed user dto
    getUser(id): Observable<User> {

        return this.authHttp
        .get(this.baseUrl + 'users/' + id)
        .map(response => <User>response.json())
        .catch(this.handleError);
    }


    // Updating user
    updateUser(id: number, user: User) {
        return this.authHttp.put(this.baseUrl + 'users/' + id, user)
            .catch(this.handleError);
    }

    // For setting the main photo for front-end
    setMainPhoto(userId: number, id: number) {
        return this.authHttp.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {}).catch(this.handleError);
    }

    
    // For deleting photos
    deletePhoto(userId: number, id: number) {
        return this.authHttp.delete(this.baseUrl + 'users/' + userId + '/photos/' + id).catch(this.handleError);
    }


    // not used
    // Might need to fix... Dont need need anymore
    private jwt() {
        const token = localStorage.getItem('token');
        if (token) {
            const headers = new Headers({'Authorization': 'Bearer ' + token});
            headers.append('Content-type', 'application/json');
            return new RequestOptions({ headers: headers });
        }
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
