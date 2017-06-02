import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AppSettings } from '../appsettings';
import { ITemplate } from '../email-template/email-template';
import { PathFinder } from '../path-finder';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class EmailTemplateService {

    // default constructor
    constructor(private _http: Http, private _pathfinder: PathFinder, public router: Router) { }

    // Calls Get Email template  Web API to fetch the list of Email template
    getEmailTemplates(): Observable<ITemplate[]> {
        return this._http.get(this._pathfinder.emailtemplateUrl, this._pathfinder.getJWT())
            .map((response: Response) => <ITemplate[]>response.json())
            .catch(err => this.handleError(err));
    }

    //// Calls Get email template  Web API to fetch the template  by the ID
    getEmailTemplateById(id: number): Observable<ITemplate> {
        return this._http.get(this._pathfinder.emailtemplateUrl + "/" + id, this._pathfinder.getJWT())
            .map((response: Response) => <ITemplate>response.json())
            .catch(err => this.handleError(err));
    }

    // Passess data to WebAPI and updates existing  template  by the ID
    updateEmailTemplate(emailtemp: any) {
        let body = JSON.stringify(emailtemp);
        return this._http.put(this._pathfinder.emailtemplateUrl + "?templateId=" + emailtemp.EmailTemplateId, body, this._pathfinder.getJWT())
            .map(res => res.json().data)
            .catch(err => this.handleError(err));
    }

    resetTemplate(templateId: number, userId: number) {
        return this._http.get(this._pathfinder.emailtemplateUrl + "/ResetTemplate/" + templateId + "/" + userId, this._pathfinder.getJWT())
            .map(res => res.json().data)
            .catch(err => this.handleError(err));
    }

    //Error Handling
    private handleError(error: Response) {
        if (error.json().ExceptionMessage == 'InvalidToken' || error.json().Message == 'InvalidToken') {
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
        }
        else
            return Observable.throw(error.json().error || 'Server error');
    }
}
