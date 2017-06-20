import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { SharedDocumentsService } from '../services/shared-documents.service';

import { DataTable } from '../angular2-datatable/datatable';
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalVariable, IDictionary } from '../shared/global';
import { ISharedDocumentViewModel, SharedDocumentViewModel} from './shared-document-view-model';
import { IUser, User } from '../login/login';

@Component({
    templateUrl: './shared-document.component.html',
    providers: [SharedService]
})

export class SharedDocumentComponent {
    /// Variables declaration
    private shareDocType: string = "mine";

    private errorMessage: string;
    private data: ISharedDocumentViewModel[] = []; // data is the default name for Angular 2 datatable used in equipment listing
    private filteredData: ISharedDocumentViewModel[] = [];
    private activePage = 1;
    private sortBy = 'FileName';
    private rowsOnPage = GlobalVariable.rowsOnPage;
    private sortOrder = 'asc';
    private FileNameFilter = '';
    private ExtensionFilter = '';
    private CreatedByFilter = '';
    private CreatedOnFilter = '';
    private LockedByFilter = '';
    private DocumentTagFilter = '';
    private SharedByNameFilter = '';
    private SharedToNameFilter = '';
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private filters: IDictionary[];
    private selectedDocId: number;
    private loggedInUser: IUser;
    private currentRowPrevValue: string = '';
    private downloadUrl: string;
    private downloadFileName: string;

    private VersionRevision: number = 1;;
    private txtWhat: string;
    private txtWhy: string;
    private rightsRequired: string = "Edit Document,Delete Document";
    private addEditDocument: boolean = false;
    private deleteDocument: boolean = false;

    busy: Subscription;
    constructor(
        private _sharedService: SharedService,
        private router: Router, private _sharedDocumentservice: SharedDocumentsService, private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.loggedInUser == null) {
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
        }
        else {
            this._route.params.subscribe(
                params => {
                    let type: string = params['type'];
                    switch (type) {
                        case "mine":
                            this.shareDocType = "mine";
                            break;
                        case "others":
                            this.shareDocType = "others";
                            break;
                        default:
                            this.shareDocType = "mine";
                            break;
                    }
                    this.GetAllDocuments();
                });
           
        }
    }

    GetAllDocuments() {
        debugger;
        if (this.shareDocType === 'mine') {
            this.busy = this._sharedDocumentservice.getDocumentsSharedByMe(this.loggedInUser.UserId)
                .subscribe(data => {
                    this.data = data;
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i].LockedByName != null && this.data[i].LockedByName != "") {
                            this.data[i].LockStatus = "Check In";
                            this.data[i].IsDocCheckedOut = true;
                        }
                        else {
                            this.data[i].LockStatus = "Check Out";
                            this.data[i].IsDocCheckedOut = false;
                        }
                    }
                    this.filteredData = this.data;
                },
                error => {
                    this.errorMessage = <any>error;
                    this.notificationTitle = this.errorMessage;
                    //this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                });
        }
        else if (this.shareDocType === 'others') {
            this.busy = this._sharedDocumentservice.getDocumentsSharedWithMe(this.loggedInUser.UserId)
                .subscribe(data => {
                    this.data = data;
                    for (var i = 0; i < this.data.length; i++) {
                        if (this.data[i].LockedByName != null && this.data[i].LockedByName != "") {
                            this.data[i].LockStatus = "Check In";
                            this.data[i].IsDocCheckedOut = true;
                        }
                        else {
                            this.data[i].LockStatus = "Check Out";
                            this.data[i].IsDocCheckedOut = false;
                        }
                    }
                    this.filteredData = this.data;
                },
                error => {
                    this.errorMessage = <any>error;
                    this.notificationTitle = this.errorMessage;
                    //this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                });
        }

    }
}