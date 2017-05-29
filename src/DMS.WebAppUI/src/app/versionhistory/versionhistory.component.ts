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
    //private currentUser: IUser;
    busy: Subscription;
    @ViewChild('mf') mf: DataTable;

    // default constructor of the AccessHistory class, initiate Document service here
    constructor(private router: Router,private _documentservice :DocumentService) {
    }

    // onInit method for the AccessHistory class, initialize AccessHistory data used for binding UI form fields, 
    // call getAccessHistorys service for binding list AccessHistory 
    ngOnInit(): void {
        this.getVersionHistory();
    }

    getVersionHistory()
    {
        this.busy = this._documentservice.getVersionHistory(10)
        .subscribe(data => {
            this.data = data;
            this.filteredData = data;
        },
        error => {
            this.errorMessage = <any>error;
            this.notificationTitle = this.errorMessage;
        });
    }
    public resetPagination() {
        this.mf.setPage(1, this.mf.rowsOnPage);
    }
 }

