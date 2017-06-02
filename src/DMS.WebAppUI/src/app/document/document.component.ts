import { Component, Input, OnInit, ViewChild, trigger, transition, style, animate, state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDocument, Document } from './document';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DocumentService } from '../services/document.service';
//import {DataTable} from '../angular2-datatable/datatable';
import {DataTable } from "angular2-datatable";
import { GlobalVariable, IDictionary } from '../shared/global';
import { SharedService } from '../shared/shared.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    templateUrl: './document.component.html',
    providers: [SharedService]
})

export class DocumentComponent {

    /// Variables declaration
    private errorMessage: string;
    private data: any[] = []; // data is the default name for Angular 2 datatable used in equipment listing
    private filteredData: any[] = [];
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
    busy: Subscription;
    @ViewChild('mf') mf: DataTable;
    @ViewChild('modal')
    modal: ModalComponent;

    constructor(
        private _sharedService: SharedService,
        private router: Router, private _documentservice: DocumentService) {
    }

    ngOnInit(): void {
        this.GetAllDocuments();
    }

    GetAllDocuments() {
        this.busy = this._documentservice.getDocuments()
            .subscribe(data => {
                this.data = data;

                this.filteredData = data;
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = this.errorMessage;
                //this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            });
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
            this.filters.push({ key: 'CreatedBy', value: CreatedByFilter });
        if (LockedByFilter != null)
            this.filters.push({ key: 'LockedBy', value: LockedByFilter });
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
        debugger;
        this.busy = this._documentservice.CheckinCheckOutDocument(docid, 1)
            .subscribe(data => {

            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = this.errorMessage;
                //this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            });
    }

    // Resets the pagination for filtered data
    public resetPagination() {
        this.mf.setPage(1, this.mf.rowsOnPage);
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let formData: FormData = new FormData();
            for (let i = 0; i < fileList.length; i++) {
                let file: File = fileList[i];
                formData.append('uploadFile', file, file.name);
            }
            this.busy = this._documentservice.uploadFile(formData)
                .subscribe(data => {
                    this.modal.close();
                },
                error => {
                    this.errorMessage = <any>error;
                    this.notificationTitle = this.errorMessage;
                    //this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                },
                () => {
                    this.notificationTitle = 'Files uploaded successfully.';
                    this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
                });
        }
    }

}

