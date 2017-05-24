import { Injectable } from '@angular/core';
import { AppSettings } from './appsettings';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PathFinder {
    userUrl: string = `${AppSettings._PeerlessHRMSUrl}/User`;
    loginUrl: string = `${AppSettings._PeerlessHRMSUrl}/Login`;

    getJWT() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.Token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.Token });
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json; charset=utf-8');
            return new RequestOptions({ headers: headers });
        }
    }
}