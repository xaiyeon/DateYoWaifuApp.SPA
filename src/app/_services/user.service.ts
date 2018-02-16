import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
// import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import { RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { AuthHttp } from 'angular2-jwt';
// import 'rxjs/add/operator/throw';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {
    baseUrl = environment.apiUrl;

    // Replacing AuthHttp with HttpClient
    constructor(private httpClient: HttpClient) { }

    // removed : Observable<User[]>
    getUsers(page?, itemsPerPage?, userParams?: any, likesParam?: string) {
        // pagination
        const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
        let params = new HttpParams();

        // Pretty ok way to build
        if (page != null && itemsPerPage != null) {
            // basically adding this to our Url
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }

        // Likes param
        if (likesParam === 'Likers') {
            // userQueryString += 'Likers=true&';
            params = params.append('Likers', 'true');
        }
        if (likesParam === 'Likees') {
            // userQueryString += 'Likees=true&';
            params = params.append('Likees', 'true');
        }

        // More query building
        if (userParams != null) {
            params = params.append('minAge', userParams.minAge);
            params = params.append('maxAge', userParams.maxAge);
            params = params.append('gender', userParams.gender);
            params = params.append('orderBy', userParams.orderBy);

        }

        // Now we are using httpClient instead of http we don't need private jwt and such
        return this.httpClient
        // need to supply what we are returning in here
        .get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
        .map(response => {
            paginatedResult.result = response.body;
            // Check pagination headers
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }

            return paginatedResult;

        });

    }

    // This is a method for getting one user for detailed user dto
    getUser(id): Observable<User> {

        return this.httpClient
        .get<User>(this.baseUrl + 'users/' + id)
        // .map(response => <User>response.json())
        ;
    }

    // Updating user
    updateUser(id: number, user: User) {
        return this.httpClient.put(this.baseUrl + 'users/' + id, user);
    }

    // For setting the main photo for front-end
    setMainPhoto(userId: number, id: number) {
        return this.httpClient.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
    }

    // For deleting photos
    deletePhoto(userId: number, id: number) {
        return this.httpClient.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
    }

    // For sending likes
    sendLike(id: number, recipientId: number) {
        return this.httpClient.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
    }


    // For getting messages, user messages
    getUserMessages(id: number, page?, itemsPerPage?, messageContainer?: string) {
        const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
        // let userQueryString = '?MessageContainer=' + messageContainer ;
        let params = new HttpParams();
        // building URL
        if (page != null && itemsPerPage != null) {
            params = params.append('MessageContainer', messageContainer);
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
            // userQueryString += '&pageNumber=' + page + '&pageSize' + itemsPerPage;
        }
        // reading JSON
        return this.httpClient.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', { observe: 'response', params })
        .map( response  => {
            paginatedResult.result = response.body;
            // checking
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        });
    }

    // displayed in the messages tab of profiles for 1 on 1
    getUserMessageThread(id: number, recipientId: number) {
        return this.httpClient.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
    }

    // sending a message to another user
    sendUserMessage(id: number, message: Message) {
        return this.httpClient.post<Message>(this.baseUrl + 'users/' + id + '/messages', message);
    }

    // delete message
    deleteUserMessage(id: number, userId: number) {
        return this.httpClient.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
    }

    // Marked as read
    markReadUserMessage(userId: number, messageId: number) {
        return this.httpClient.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {}).subscribe();
    }

    // not used
    // Might need to fix... Dont need need anymore
    // private jwt() {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const headers = new Headers({'Authorization': 'Bearer ' + token});
    //         headers.append('Content-type', 'application/json');
    //         return new RequestOptions({ headers: headers });
    //     }
    // }


}
