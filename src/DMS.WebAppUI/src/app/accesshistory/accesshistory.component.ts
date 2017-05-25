import { Component, Input, OnInit, ViewChild, trigger, transition, style, animate, state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { DataTable } from '../angular2-datatable/datatable';
import { IAccessHistory, AccessHistory } from './accesshistory';
//import { DataTablesModule } from 'angular-datatables';
import { DocumentService } from '../services/document.service';
//import { GlobalVariable, IDictionary } from '../shared/global';
//import { IUser, User, IUserRoleRights } from './login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
@Component({
    templateUrl: './accesshistory.component.html',
})

export class AccessHistoryComponent {

    /// Variables declaration
    private errorMessage: string;
    private data: IAccessHistory[]; // data is the default name for Angular 2 datatable used in equipment listing
    private filteredData: IAccessHistory[];
    private activePage = 1;
    private sortBy = 'Action';
    private sortOrder = 'asc';
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private filters: IDictionary[];
    //private currentUser: IUser;
    busy: Subscription;
    //@ViewChild('mf') mf: DataTable; // used for resetting datatable paging Index after filtering data

    // default constructor of the Equipment class, initiate Equipment service here
    constructor(private router: Router,private _documentservice :DocumentService) {
    }

    // onInit method for the Equipment class, initialize Equipment data used for binding UI form fields, 
    // call getEquipments service for binding list Equipment 
    ngOnInit(): void {
        this.getAccessHistory();
    }

    getAccessHistory()
    {
    this.busy = this._documentservice.getAccessHistory("1")
        .subscribe(data => {
            this.filteredData = data;
        },
        error => {
            this.errorMessage = <any>error;
            this.notificationTitle = this.errorMessage;
        });
}
 }



export interface IDictionary {
    key: string;
    value: string;
}