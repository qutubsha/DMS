import { Component, Input, OnInit, ViewChild, trigger, transition, style, animate, state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IVersionHistory, VersionHistory } from './versionhistory';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DocumentService } from '../services/document.service';
import {DataTable } from "angular2-datatable";
import { GlobalVariable, IDictionary } from '../shared/global';

@Component({
    templateUrl: './versionhistory.component.html',
})

export class VersionHistoryComponent {

    /// Variables declaration
    private errorMessage: string;
    private data: any[] = []; // data is the default name for Angular 2 datatable used in AccessHistory listing
    private filteredData: any[] = [];
    private activePage = 1;
    private sortBy = 'Action';
    private rowsOnPage = GlobalVariable.rowsOnPage;
    private sortOrder = 'asc';
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private versionFilter = '';
    private revisionFilter = '';
    private fileNameFilter = '';
    private extensionFilter = '';
    private whatFilter = '';
    private whyFilter = '';
    private filters: IDictionary[];
    private docid: number;

    //private currentUser: IUser;
    busy: Subscription;
    @ViewChild('mf') mf: DataTable;

    // default constructor of the AccessHistory class, initiate Document service here
    constructor(private router: Router, private _documentservice: DocumentService, private _route: ActivatedRoute) {
    }

    // onInit method for the AccessHistory class, initialize AccessHistory data used for binding UI form fields, 
    // call getAccessHistorys service for binding list AccessHistory 
    ngOnInit(): void {
        this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.docid = id;
            });
        this.getVersionHistory();
    }

    getVersionHistory() {
        this.busy = this._documentservice.getVersionHistory(this.docid)
            .subscribe(data => {
                this.data = data;
                this.filteredData = data;
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = this.errorMessage;
            });
    }

    filterVersionHistory() {

        let versionFilter = this.versionFilter ? this.versionFilter.toLocaleLowerCase() : null;
        let revisionFilter = this.revisionFilter ? this.revisionFilter.toLocaleLowerCase() : null;
        let fileNameFilter = this.fileNameFilter ? this.fileNameFilter.toLocaleLowerCase() : null;
        let extensionFilter = this.extensionFilter ? this.extensionFilter.toLocaleLowerCase() : null;
        let whatFilter = this.whatFilter ? this.whatFilter.toLocaleLowerCase() : null;
        let whyFilter = this.whyFilter ? this.whyFilter.toLocaleLowerCase() : null;

        this.filters = [];
        if (versionFilter != null)
            this.filters.push({ key: 'VersionId', value: versionFilter });
        if (revisionFilter != null)
            this.filters.push({ key: 'RevisionId', value: revisionFilter });
        if (fileNameFilter != null)
            this.filters.push({ key: 'FileName', value: fileNameFilter });
        if (extensionFilter != null)
            this.filters.push({ key: 'Extension', value: extensionFilter });
        if (whatFilter != null)
            this.filters.push({ key: 'What', value: whatFilter });
        if (whyFilter != null)
            this.filters.push({ key: 'Why', value: whyFilter });

        this.filteredData = this.data;
        for (var i = 0; i < this.filters.length; i++) {
            let tempData: IVersionHistory[];

            tempData = this.filteredData.filter((doc: IVersionHistory) =>
                doc[this.filters[i].key] != null && doc[this.filters[i].key].toString() != '' &&
                doc[this.filters[i].key].toString().toLocaleLowerCase().indexOf(this.filters[i].value.toString()) != -1);
            this.filteredData = tempData;

        }
    }

    NavigateToDocuments() {
        this.router.navigate(['/document'], { skipLocationChange: true });
    }

    public resetPagination() {
        this.mf.setPage(1, this.mf.rowsOnPage);
    }
}

