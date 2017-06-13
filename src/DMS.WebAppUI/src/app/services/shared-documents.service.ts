import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PathFinder } from '../path-finder';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class SharedDocumentsService {

    // default constructor
    constructor(private _http: Http, private _pathfinder: PathFinder, private router: Router) { }


    //Error Handling
    private handleError(error: Response) {
        return Observable.throw(error.json().Message || 'Server error');
    }
}
