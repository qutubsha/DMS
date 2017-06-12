import { Component, Input, OnInit, ViewChild, trigger, transition, style, animate, state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDocument, Document } from './document';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DocumentService } from '../services/document.service';
//import {DataTable} from '../angular2-datatable/datatable';
import { DataTable } from "angular2-datatable";
import { GlobalVariable, IDictionary } from '../shared/global';
import { SharedService } from '../shared/shared.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IUser, User } from '../login/login';
//import * as $ from 'jquery'
//window['$'] = window['jQuery'] = $;
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
    templateUrl: './document.component.html',
    providers: [SharedService]
})

export class DocumentComponent {

    /// Variables declaration
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
    private downloadUrl: string;
    private downloadFileName: string;

    busy: Subscription;
    @ViewChild('mf') mf: DataTable;
    @ViewChild('modal')
    modal: ModalComponent;
    @ViewChild('dlteDocmodal')
    dlteDocmodal: ModalComponent;
    constructor(
        private _sharedService: SharedService,
        private router: Router, private _documentservice: DocumentService) {
    }

    ngOnInit(): void {

        this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.loggedInUser == null) {
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
        }
        else {
            this.GetAllDocuments();
        }
    }

    GetAllDocuments() {
        this.busy = this._documentservice.getDocuments(this.loggedInUser.UserId)
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
                this.GetAllDocuments();
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

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let formData: FormData = new FormData();
            formData.append("userId~" + this.loggedInUser.UserId, 1);
            for (let i = 0; i < fileList.length; i++) {
                let file: File = fileList[i];
                formData.append('uploadFile', file, file.name);
            }
            event.srcElement.value = "";
            this.busy = this._documentservice.uploadFile(formData)
                .subscribe(data => {
                    this.modal.close();
                    this.GetAllDocuments();
                },
                error => {
                    this.modal.close();
                    this.errorMessage = <any>error;
                    this.notificationTitle = this.errorMessage;
                    this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                },
                () => {
                    this.notificationTitle = 'Files uploaded successfully.';
                    this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
                });
        }
    }

    showDlteCOnfirm(docid: number) {
        this.selectedDocId = docid;
        this.dlteDocmodal.open();
    }

    DeleteDoc() {
        this.busy = this._documentservice.deleteDocument(this.selectedDocId, this.loggedInUser.UserId)
            .subscribe(data => {
                this.modal.close();
                this.GetAllDocuments();
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

    DownloadDoc(id, fileName) {
        debugger;
        this._documentservice.downloadF().subscribe(blob => {
            debugger;
            //importedSaveAs(blob, '1.docx');
            var url = URL.createObjectURL(blob);
            this.downloadUrl = url;
            this.downloadFileName = '1.docx';
            //var linkElement = document.createElement('a');
            //linkElement.setAttribute('id', 'aDownload');
            //linkElement.setAttribute('href', url);
            //linkElement.setAttribute("download", '1.docx');
            document.getElementById('aDownload').click();

            //var downloadUrl = URL.createObjectURL(blob);
            //window.open(downloadUrl);
        });


        //this._documentservice.downloadFile().subscribe(blob => {
        //    debugger;
        //    var downloadUrl = URL.createObjectURL(blob);
        //    window.open(downloadUrl);
        //});
            //.subscribe(blob => {
            //    debugger;
            //    importedSaveAs(blob, fileName);
            //});
    }
}

