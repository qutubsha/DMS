import { Injectable } from '@angular/core';
import { IDocument, Document} from '../document/document';
import { IAccessHistory, AccessHistory} from '../accesshistory/accesshistory';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { PathFinder } from '../path-finder';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class DocumentService {

    // default constructor
    constructor(private _http: Http, private _pathfinder: PathFinder, private router: Router) { }


    getDocuments(): Observable<IDocument[]> {
        //let headers = new Headers();
        //headers.append('Accept', 'application/json');
        //headers.append('Content-Type', 'application/json; charset=utf-8');
        //headers.append('Access-Control-Allow-Origin', ' *');
        ////let body = JSON.stringify(username);
        //let options = new RequestOptions({ headers: headers });

        return this._http.get(this._pathfinder.documentUrl, this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <IDocument>response.json())
            .catch(err => this.handleError(err));
    }

    getAccessHistory(documentId: string): Observable<IAccessHistory[]> {
        return this._http.get(this._pathfinder.AccessHistoryUrl + "/" + documentId, this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <IAccessHistory>response.json())
            .catch(err => this.handleError(err));
    }

    //Error Handling
    private handleError(error: Response) {
        return Observable.throw(error.json().Message || 'Server error');
    }
}
