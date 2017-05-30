import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AppSettings } from '../appsettings';
import { IUser, User} from '../login/login';
import { PathFinder } from '../path-finder';

@Injectable()
export class UserService {

    // default constructor
    constructor(private _http: Http, private _pathfinder: PathFinder, private router: Router) { }

    getLoginUser(user: any): Observable<any> {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json; charset=utf-8');
        let body = JSON.stringify(user);
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._pathfinder.loginUrl + "/Login" + "?Password=" + user.Password+"&Email=" + user.Email, body, options)
            .map((response: Response) => <any>response.json())
            .catch(err => this.handleError(err));
    }


    addUser(saveUser: any) {
        debugger
        ///AddUser
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json; charset=utf-8');
        let body = JSON.stringify(saveUser);
        let options = new RequestOptions({ headers: headers });
        // ?UserName = admin & Password=123
        return this._http.post(this._pathfinder.loginUrl + "/AddUser", body, options)
            .map((response: Response) => <any>response.json())
            .catch(err => this.handleError(err));
    }
    // Passess data to WebAPI and updates existing  User by User Id
    updateUser(upUser: any) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json; charset=utf-8');
        let body = JSON.stringify(upUser);
        let options = new RequestOptions({ headers: headers });
        // ?UserName = admin & Password=123
        return this._http.put(this._pathfinder.loginUrl + "/UpdatePassword" + "/" + upUser.eMail +"/"+ upUser.oldPwd +"/"+ upUser.newPwd , body, options)
            .map((response: Response) => <any>response.json())
            .catch(err => this.handleError(err));
    }
    // Calls web api to check the rights of all the roles assigned to userid passed against the comma seperated list of rights passed
    // Returns only those rights that are permitted from the list of rights passed as input
    // this method will be called on page load of each screen, respective screens rights will be passed as comma seperated along with logged in user id
    // method returns only those rights that are permitted from the list of rights passed as input
    //checkPermissions(allRights: string, userId: number): Observable<string[]> {
    //    let body = JSON.stringify(allRights);
    //    return this._http.post(this._pathfinder.manageuserrolerights + "/CheckPermissions/" + userId, body, this._pathfinder.getJWT())
    //        .map(response => <string[]>response.json())
    //        .catch(err => this.handleError(err));
    //}

    SendMailOnForgotPassword(username: string): Observable<IUser[]> {
        //return this._http.get(this._pathfinder.userUrl + "/ForgotPassword?username=" + username, this._pathfinder.getJWT())
        //    .map((response: Response) => <IUser[]>response.json())
        //    .catch(err => this.handleError(err));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json; charset=utf-8');
       //let body = JSON.stringify(username);
       let options = new RequestOptions({ headers: headers });
       return this._http.get(this._pathfinder.userUrl + "/ForgotPassword?username=" + username, options)
            .map((response: Response) => <IUser>response.json())
            .catch(err => this.handleError(err));
    }

    //Error Handling
    private handleError(error: Response) {
        return Observable.throw(error.json().Message || 'Server error');
    }
}