import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AppSettings } from '../appsettings';
import { PathFinder } from '../path-finder';
import { IRole, Role } from '../roles/roles';

@Injectable()
export class RolesService {

    // default constructor
    constructor(private _http: Http, private _pathfinder: PathFinder, private router: Router) { }

    getRoles(): Observable<IRole[]> {
        return this._http.get(this._pathfinder.roleUrl, this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <IRole>response.json())
            .catch(err => this.handleError(err));
    }

    addRole(role: any) {
        let body = JSON.stringify(role);
        return this._http.post(this._pathfinder.roleUrl, body, this._pathfinder.getheaderWithoutJWT())
            .map(res => res.json().data)
            .catch(err => this.handleError(err));
    }

    updateRole(role: any) {
        let body = JSON.stringify(role);
        return this._http.put(this._pathfinder.roleUrl, body, this._pathfinder.getheaderWithoutJWT())
            .map(res => res.json().data)
            .catch(err => this.handleError(err));
    }

    //Error Handling
    private handleError(error: Response) {
        return Observable.throw(error.json().Message || 'Server error');
    }
}