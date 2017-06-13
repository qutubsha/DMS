import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AppSettings } from '../appsettings';
import { PathFinder } from '../path-finder';
import {IConfigurationSetting, ConfigurationSetting} from '../configuration-settings/configuration-settings';

@Injectable()
export class ConfigurationSettingsService {

    // default constructor
    constructor(private _http: Http, private _pathfinder: PathFinder, private router: Router) { }

    getConfigSettings(): Observable<IConfigurationSetting> {
        return this._http.get(this._pathfinder.configurationSettingUrl, this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <IConfigurationSetting>response.json())
            .catch(err => this.handleError(err));
    }

    updateConfigSettings(configSetting: any) {
        let body = JSON.stringify(configSetting);
        return this._http.put(this._pathfinder.configurationSettingUrl, body, this._pathfinder.getheaderWithoutJWT())
            .map(res => res.json().data)
            .catch(err => this.handleError(err));
    }

    //Error Handling
    private handleError(error: Response) {
        return Observable.throw(error.json().Message || 'Server error');
    }
}
