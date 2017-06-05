import { Component, Input, OnInit, ViewChild, trigger, transition, style, animate, state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAccessHistory, AccessHistory } from './accesshistory';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DocumentService } from '../services/document.service';
import {DataTable } from "angular2-datatable";
import { GlobalVariable, IDictionary } from '../shared/global';

@Component({
    templateUrl: './accesshistory.component.html',
})

export class AccessHistoryComponent {

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
    private ActionFilter = '';
    private PerformedByFilter = '';
    private PerformedOnFilter = '';
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
        this.getAccessHistory();
    }
    filterHistory() {

        let ActionFilter = this.ActionFilter ? this.ActionFilter.toLocaleLowerCase() : null;
        let PerformedByFilter = this.PerformedByFilter ? this.PerformedByFilter.toLocaleLowerCase() : null;
        let PerformedOnFilter = this.PerformedOnFilter ? this.PerformedOnFilter.toLocaleLowerCase() : null;

        this.filters = [];
        if (ActionFilter != null)
            this.filters.push({ key: 'Action', value: ActionFilter });
        if (PerformedByFilter != null)
            this.filters.push({ key: 'PerformedBy', value: PerformedByFilter });
        if (PerformedOnFilter != null)
            this.filters.push({ key: 'PerformedOn', value: PerformedOnFilter });

        this.filteredData = this.data;
        for (var i = 0; i < this.filters.length; i++) {
            let tempData: IAccessHistory[];

            tempData = this.filteredData.filter((doc: IAccessHistory) =>
                doc[this.filters[i].key] != null && doc[this.filters[i].key].toString() != '' &&
                doc[this.filters[i].key].toString().toLocaleLowerCase().indexOf(this.filters[i].value.toString()) != -1);
            this.filteredData = tempData;

        }
    }

    getAccessHistory() {
        this.busy = this._documentservice.getAccessHistory(this.docid)
            .subscribe(data => {
                this.data = data;
                this.filteredData = data;
            }, 
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = this.errorMessage;
            });
    }

    NavigateToDocuments() {
        this.router.navigate(['/document'], { skipLocationChange: true });
    }

    public resetPagination() {
        this.mf.setPage(1, this.mf.rowsOnPage);
    }
}

