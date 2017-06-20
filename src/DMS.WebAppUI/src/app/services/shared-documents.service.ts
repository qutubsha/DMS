import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PathFinder } from '../path-finder';
import { Router, ActivatedRoute } from '@angular/router';
import { ISharedDocumentViewModel, SharedDocumentViewModel } from '../shared-document/shared-document-view-model';

@Injectable()
export class SharedDocumentsService {

    // default constructor
    constructor(private _http: Http, private _pathfinder: PathFinder, private router: Router) { }

    getDocumentsSharedByMe(loginId: number): Observable<ISharedDocumentViewModel[]> {
        //let headers = new Headers();
        //headers.append('Accept', 'application/json');
        //headers.append('Content-Type', 'application/json; charset=utf-8');
        //headers.append('Access-Control-Allow-Origin', ' *');
        ////let body = JSON.stringify(username);
        //let options = new RequestOptions({ headers: headers });
        return this._http.get(this._pathfinder.sharedDocumentUrl +"/SharedByMe" + "?loginId=" + loginId , this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <ISharedDocumentViewModel>response.json())
            .catch(err => this.handleError(err));
    }

    getDocumentsSharedWithMe(loginId: number): Observable<ISharedDocumentViewModel[]> {
        //let headers = new Headers();
        //headers.append('Accept', 'application/json');
        //headers.append('Content-Type', 'application/json; charset=utf-8');
        //headers.append('Access-Control-Allow-Origin', ' *');
        ////let body = JSON.stringify(username);
        //let options = new RequestOptions({ headers: headers });
        return this._http.get(this._pathfinder.sharedDocumentUrl +"/SharedWithMe"+ "?loginId=" + loginId, this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <ISharedDocumentViewModel>response.json())
            .catch(err => this.handleError(err));
    }

    //Error Handling
    private handleError(error: Response) {
        return Observable.throw(error.json().Message || 'Server error');
    }
}
