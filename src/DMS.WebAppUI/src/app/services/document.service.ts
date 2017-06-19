import { Injectable } from '@angular/core';
import { IDocument, Document } from '../document/document';
import { IAccessHistory, AccessHistory } from '../accesshistory/accesshistory';
import { IVersionHistory, VersionHistory } from '../versionhistory/versionhistory';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PathFinder } from '../path-finder';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class DocumentService {

    // default constructor
    constructor(private _http: Http, private _pathfinder: PathFinder, private router: Router) { }


    getDocuments(loginId: number, showShared: boolean): Observable<IDocument[]> {
        //let headers = new Headers();
        //headers.append('Accept', 'application/json');
        //headers.append('Content-Type', 'application/json; charset=utf-8');
        //headers.append('Access-Control-Allow-Origin', ' *');
        ////let body = JSON.stringify(username);
        //let options = new RequestOptions({ headers: headers });
        return this._http.get(this._pathfinder.documentUrl + "?loginId=" + loginId + "&showShared=" + showShared, this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <IDocument>response.json())
            .catch(err => this.handleError(err));
    }

    getAccessHistory(documentId: number): Observable<IAccessHistory[]> {
        return this._http.get(this._pathfinder.AccessHistoryUrl + "/" + documentId, this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <IAccessHistory>response.json())
            .catch(err => this.handleError(err));
    }

    getVersionHistory(documentId: number): Observable<IAccessHistory[]> {
        return this._http.get(this._pathfinder.VersionHistoryUrl + "/" + documentId, this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <IVersionHistory>response.json())
            .catch(err => this.handleError(err));
    }

    CheckinCheckOutDocument(documentId: number, loginId: number) {
        return this._http.put(this._pathfinder.documentUrl + "?documentId=" + documentId + "&loginId=" + loginId, this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <IAccessHistory>response.json())
            .catch(err => this.handleError(err));
    }

    uploadFile(formData): any {
        let headers = new Headers()
        //headers.append('Content-Type', 'json');  
        headers.append('Accept', 'text/plain');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._pathfinder.documentUrl + "/UploadFiles", formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error));
    }

    uploadCheckedInFile(formData): any {
        let headers = new Headers()
        //headers.append('Content-Type', 'json');  
        headers.append('Accept', 'text/plain');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._pathfinder.documentUrl + "/uploadCheckedInFile", formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error));
    }

    deleteDocument(documentId: number, loginId: number): any {
        let headers = new Headers()
        //headers.append('Content-Type', 'json');  
        //headers.append('Accept', 'application/json');  
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(this._pathfinder.documentUrl + "?id=" + documentId + "&loginid=" + loginId, this._pathfinder.getheaderWithoutJWT())
            .map(res => res.json())
            .catch(error => Observable.throw(error));
    }

    tagDocument(id: number, loginId: number, tags: string): any {
        return this._http.put(this._pathfinder.documentUrl + "/TagDocument/" + id + "?loginId=" + loginId + "&tags=" + tags, this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <IAccessHistory>response.json())
            .catch(err => this.handleError(err));
    }

    downloadFile(documentId: number, currentVersion: number, currentRevision: number, userId: number): Observable<File> {
        let options = new RequestOptions({ responseType: ResponseContentType.Blob });
        return this._http.get(this._pathfinder.documentUrl + '/DownloadFile?documentId=' + documentId + '&versionId=' + currentVersion + '&revisionId=' + currentRevision + '&userId=' + userId, options)
            .map(this.extractContent)
            .catch(this.handleError);
    }

    getDocumentsCount(loginId: number): any {
        return this._http.get(this._pathfinder.documentUrl + "/GetDocumentsCount?loginId=" + loginId, this._pathfinder.getheaderWithoutJWT())
            .map((response: Response) => <any>response.json())
            .catch(err => this.handleError(err));
    }

    private extractContent(res: Response) {
        let blob: Blob = res.blob();
        return blob;
    }

    //Error Handling
    private handleError(error: Response) {
        return Observable.throw(error.json().Message || 'Server error');
    }
}
