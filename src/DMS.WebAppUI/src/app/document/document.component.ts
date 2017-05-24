import { Component, Input, OnInit, ViewChild, trigger, transition, style, animate, state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDocument, Document } from './document';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DocumentService } from '../services/document.service';

@Component({
    templateUrl: './document.component.html',
})

export class DocumentComponent {

    /// Variables declaration
    private errorMessage: string;
    private data: IDocument[]; // data is the default name for Angular 2 datatable used in equipment listing
    private filteredData: IDocument[];
    private activePage = 1;
    private sortBy = 'FileName';
    private sortOrder = 'asc';
    private docelement: IDocument;
    private FileNameFilter = '';
    private ExtensionFilter = '';
    private CreatedByFilter = '';
    private IsSharedFilter = '';
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private filters: IDictionary[];
    busy: Subscription;
    constructor(private router: Router, private _documentservice: DocumentService) {
    }


    ngOnInit(): void {
        this.busy = this._documentservice.getDocuments()
            .subscribe(data => {
                // this.data = data;
                this.filteredData = data;
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = this.errorMessage;
                //this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            });
    }


}



export interface IDictionary {
    key: string;
    value: string;
}