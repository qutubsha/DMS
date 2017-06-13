import { Component, Input, OnInit, ViewChild, trigger, transition, style, animate, state } from '@angular/core';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DataTable } from "angular2-datatable";
import { DocAdvanceSearchService } from '../services/doc-advance-search.service';
import { DocumentService } from '../services/document.service';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalVariable, IDictionary } from '../shared/global';
import { SharedService } from '../shared/shared.service';
import { IAdvanceSearch, AdvanceSearch, IDocument, Document,DocType} from '../document/document';
import { IUser, User } from '../login/login';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    templateUrl: './doc-advance-search.component.html',
    providers: [SharedService, DocAdvanceSearchService]
})

export class DocAdvanceSearchComponent {
    private search: IAdvanceSearch
    private errorMessage: string;
    private data: IDocument[] = []; // data is the default name for Angular 2 datatable used in equipment listing
    private filteredData: IDocument[] = [];
    private activePage = 1;
    private sortBy = 'FileName';
    private rowsOnPage = GlobalVariable.rowsOnPage;
    private sortOrder = 'asc';
    private docelement: IDocument;
    private FileNameFilter = '';
    private ExtensionFilter = '';
    private CreatedByFilter = '';
    private CreatedOnFilter = '';
    private LockedByFilter = '';
    private DocumentTagFilter = '';
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private filters: IDictionary[];
    private selectedDocId: number;
    private loggedInUser: IUser;
    private docType: DocType = DocType.All;

    busy: Subscription;
    @ViewChild('mf') mf: DataTable;
    @ViewChild('modal')
    modal: ModalComponent;
    @ViewChild('dlteDocmodal')
    dlteDocmodal: ModalComponent;

    constructor(
        private router: Router,
        private _docAdvancesearchService: DocAdvanceSearchService,
        private _documentservice: DocumentService,
        private _route: ActivatedRoute,
        private _sharedService: SharedService
    ) { }

    ngOnInit() {
        this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.loggedInUser == null) {
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
        }
        else {

            this.search = {
                FileName: '',
                Extension: '',
                FromDate: null,
                ToDate : null
            };
        }
    }

    submitForm(event: Event): void {
        debugger

        this.searchDocuments();
    }

    searchDocuments()
    {
        let search: IAdvanceSearch = new AdvanceSearch(this.search.FileName, this.search.Extension,this.search.FromDate, this.search.ToDate);
        this.busy = this._docAdvancesearchService.search(search).subscribe(
            data => {
                if (data != null) {
                    this.data = data;
                    this.filteredData = data;
                    return true;
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = this.errorMessage;
            }
        );
    }

    filterDocuments() {
        let FileNameFilter = this.FileNameFilter ? this.FileNameFilter.toLocaleLowerCase() : null;
        let ExtensionFilter = this.ExtensionFilter ? this.ExtensionFilter.toLocaleLowerCase() : null;
        let CreatedByFilter = this.CreatedByFilter ? this.CreatedByFilter.toLocaleLowerCase() : null;
        let LockedByFilter = this.LockedByFilter ? this.LockedByFilter.toLocaleLowerCase() : null;
        let DocumentTagFilter = this.DocumentTagFilter ? this.DocumentTagFilter.toLocaleLowerCase() : null;
        let CreatedOnFilter = this.CreatedOnFilter ? this.CreatedOnFilter.toLocaleLowerCase() : null;


        this.filters = [];
        if (FileNameFilter != null)
            this.filters.push({ key: 'FileName', value: FileNameFilter });
        if (ExtensionFilter != null)
            this.filters.push({ key: 'Extension', value: ExtensionFilter });
        if (CreatedByFilter != null)
            this.filters.push({ key: 'CreatedByName', value: CreatedByFilter });
        if (LockedByFilter != null)
            this.filters.push({ key: 'LockedByName', value: LockedByFilter });
        if (DocumentTagFilter != null)
            this.filters.push({ key: 'DocumentTags', value: DocumentTagFilter });
        if (CreatedOnFilter != null)
            this.filters.push({ key: 'CreatedOn', value: CreatedOnFilter });

        this.filteredData = this.data;

        for (var i = 0; i < this.filters.length; i++) {
            let tempData: IDocument[];

            tempData = this.filteredData.filter((doc: IDocument) =>
                doc[this.filters[i].key] != null && doc[this.filters[i].key].toString() != '' &&
                doc[this.filters[i].key].toString().toLocaleLowerCase().indexOf(this.filters[i].value.toString()) != -1);
            this.filteredData = tempData;
        }

    }

    LockDoc(docid: number) {
        this.busy = this._documentservice.CheckinCheckOutDocument(docid, this.loggedInUser.UserId)
            .subscribe(data => {
                this.searchDocuments();
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = this.errorMessage;
                this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            },
            () => {
                this.notificationTitle = 'Document Checked-out successfully.';
                this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
            });
    }

    ViewAccessHistory(docid: number) {
        this.router.navigate(['/docaccesshistory', docid], { skipLocationChange: true });
    }

    ViewVersionHistory(docid: number) {
        this.router.navigate(['/docversionhistory', docid], { skipLocationChange: true });
    }

    // Resets the pagination for filtered data
    public resetPagination() {
        this.mf.setPage(1, this.mf.rowsOnPage);
    }

    showDlteCOnfirm(docid: number) {
        this.selectedDocId = docid;
        this.dlteDocmodal.open();
    }

    DeleteDoc() {
        this.busy = this._documentservice.deleteDocument(this.selectedDocId, this.loggedInUser.UserId)
            .subscribe(data => {
                this.modal.close();
                this.searchDocuments();
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = this.errorMessage;
                this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            },
            () => {
                this.notificationTitle = 'Document deleted successfully.';
                this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
            });
    }
}