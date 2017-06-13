import { Injectable } from '@angular/core';
import { IDocument, Document } from '../document/document';
import { IAccessHistory, AccessHistory } from '../accesshistory/accesshistory';
import { IVersionHistory, VersionHistory } from '../versionhistory/versionhistory';
import { Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
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

    //downloadFile(id): Observable<Blob> {
    //    debugger;
    //    let options = new RequestOptions({ responseType: ResponseContentType.Blob });
    //    return this._http.get(this._pathfinder.documentUrl + '/DownloadFile?documentId=1&userId=1', options)
    //        .map(res => res.blob())
    //        .catch(this.handleError)
    //}

    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    //downloadFile(id) {
    //    //debugger;
    //    //return this._http.get(this._pathfinder.documentUrl + '/DownloadFile?documentId=1&userId=1', { headers: this.headers })
    //    //    .map(this.processBlob)
    //    //    .catch(this.handleError);

    //    let headers = new Headers();
    //    headers.append('Content-Type', 'application/json');
    //    headers.append('responseType', 'blob');

    //    return this._http.get(this._pathfinder.documentUrl + '/DownloadFile?documentId=1&userId=1', { headers: headers })
    //        .map(response => {
    //            debugger;

    //            if (response.status == 400) {
    //                this.handleError;
    //            } else if (response.status == 200) {
    //                debugger;
    //                var contentType = response.headers.keys["ContentType"];
    //                var blob = new Blob([(<any>response)._body], { type: contentType });            // size is 89KB instead of 52KB
    //                //                    var blob = new Blob([(<any>response).arrayBuffer()], { type: contentType });  // size is 98KB instead of 52KB
    //                //                    var blob = new Blob([(<any>response).blob()], { type: contentType });         // received Error: The request body isn't either a blob or an array buffer
    //                return blob;
    //            }
    //        })
    //        .catch(this.handleError);
    //}

    downloadFile(): Observable<Object[]> {
        return Observable.create(observer => {

            let xhr = new XMLHttpRequest();

            xhr.open('POST', this._pathfinder.documentUrl + '/DownloadFile?documentId=1&userId=1', true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.responseType = 'blob';

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        debugger
                        var contentType = { type: 'application/pdf' }; //xhr.response.headers.keys["ContentType"];
                        var blob = new Blob([xhr.response], contentType);
                        observer.next(blob);
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            }
            xhr.send();

        });
    }

    down() {
        let options = new RequestOptions({ responseType: ResponseContentType.Blob });
        return this._http.get(this._pathfinder.documentUrl + '/down?documentId=1&userId=1', options)
            .map(this.extractData)
            //.map((response: Response) => {
            //    var filename = response.headers['x-filename'];
            //    var contentType = response.headers['content-type'];
            //    var blob = new Blob([response], { type: contentType });

            //    <IVersionHistory>response.json()
            //})
            .catch(err => this.handleError(err));
    }

    downloadF(): Observable<File> {
        //let headers = new Headers({ 'Content-Type': 'application/json', 'MyApp-Application': 'AppName', 'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });		
        let options = new RequestOptions({ responseType: ResponseContentType.Blob });
        return this._http.get(this._pathfinder.documentUrl + '/Docu?documentId=1&userId=1', options)
            .map(this.extractContent)
            .catch(this.handleError);
    }
    private extractContent(res: Response) {
        debugger;
        let blob: Blob = res.blob();
        return blob;
        //window['saveAs'](blob, 'test.docx');		
    }
    private extractData(response: Response): any {
        debugger;
        var filename = response.headers['x-filename'];
        var contentType = response.headers['content-type'];
        var blob = new Blob([response.blob()], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        return blob;
    }
    protected processBlob(response: Response): any {
        const responseBlob = response.arrayBuffer();
        const status = response.status;
        if (status === 200) {
            let result200: any = null;
            let resultData200 = responseBlob;
            result200 = resultData200 !== undefined ? resultData200 : null;
            return result200;
        } else if (status !== 200 && status !== 204) {
            //this.errorHandler.throwException("An unexpected server error occurred.", status, responseBlob);		
        }
        return null;
    }

    //Error Handling
    private handleError(error: Response) {
        return Observable.throw(error.json().Message || 'Server error');
    }
}
