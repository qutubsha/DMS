import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PathFinder } from '../path-finder';
import { Router, ActivatedRoute } from '@angular/router';
import { IDocument, Document } from '../document/document';
import { IAdvanceSearch, AdvanceSearch} from '../document/document';
import { AppSettings } from '../appsettings';

@Injectable()
export class DocAdvanceSearchService {

    // default constructor
    constructor(private _http: Http, private _pathfinder: PathFinder, private router: Router) { }

    search(docAdvancedSearch: IAdvanceSearch): Observable<IDocument[]> {
        alert(this._pathfinder.advanceSearchUrl + "?fileName=" + docAdvancedSearch.FileName +
            "&extension=" + docAdvancedSearch.Extension);
        return this._http.get(this._pathfinder.advanceSearchUrl + "?fileName=" + docAdvancedSearch.FileName +
            "&extension=" + docAdvancedSearch.Extension + 
            "&fromDate=" + docAdvancedSearch.FromDate + 
            "&toDate=" + docAdvancedSearch.ToDate, this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <IDocument>response.json())
            .catch(err => this.handleError(err));
    }
        
    //Error Handling
    private handleError(error: Response) {
        return Observable.throw(error.json().Message || 'Server error');
    }
}
