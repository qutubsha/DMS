﻿import { Injectable } from '@angular/core';
import { AppSettings } from './appsettings';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PathFinder {
    userUrl: string = `${AppSettings._DMSUrl}/User`;
    loginUrl: string = `${AppSettings._DMSUrl}/User`;
    documentUrl: string = `${AppSettings._DMSUrl}/Document`;
    AccessHistoryUrl: string = `${AppSettings._DMSUrl}/DocumentAccessHistory`;
    VersionHistoryUrl: string = `${AppSettings._DMSUrl}/Document/versions`;
    roleUrl: string = `${AppSettings._DMSUrl}/role`;
   
    emailtemplateUrl: string = `${AppSettings._DMSUrl}/EmailTemplate`;
    advanceSearchUrl: string = `${AppSettings._DMSUrl}/Document/searchdocuments`;
    configurationSettingUrl: string = `${AppSettings._DMSUrl}/configurationsettings`;
    sharedDocumentUrl: string = `${AppSettings._DMSUrl}/SharedDocumentUser`;
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

    getheaderWithoutJWT() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json: charset=utf-8');
        return new RequestOptions({ headers: headers });
    }
}