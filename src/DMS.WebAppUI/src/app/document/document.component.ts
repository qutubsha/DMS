﻿import { Component, Input, OnInit, ViewChild, trigger, transition, style, animate, state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDocument, Document, DocType } from './document';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DocumentService } from '../services/document.service';
import {DataTable} from '../angular2-datatable/datatable';
import { GlobalVariable, IDictionary } from '../shared/global';
import { SharedService } from '../shared/shared.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { IUser, User } from '../login/login';
//import * as $ from 'jquery'
//window['$'] = window['jQuery'] = $;
import { saveAs as importedSaveAs } from 'file-saver';
import { PathFinder } from '../path-finder';
import { FileUpload } from 'primeng/primeng';
import { UserService } from '../services/user.service';

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
    private docType: DocType = DocType.Personal;
    private currentRowPrevValue: string = '';
    private downloadUrl: string;
    private downloadFileName: string;

    private VersionRevision: number = 1;;
    private txtWhat: string;
    private txtWhy: string;
    private rightsRequired: string = "Edit Document,Delete Document";
    private addEditDocument: boolean = false;
    private deleteDocument: boolean = false;

    uploadedFiles: any[] = [];
    fileUploadUrl = this._pathfinder.documentUrl + "/UploadFiles";
    userDetails = '';

    busy: Subscription;
    @ViewChild('mf') mf: DataTable;
    @ViewChild('modal')
    modal: ModalComponent;
    @ViewChild('dlteDocmodal')
    dlteDocmodal: ModalComponent;
    constructor(
        private _pathfinder: PathFinder,
        private _sharedService: SharedService,
        private _userService: UserService,
        private router: Router, private _documentservice: DocumentService, private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
        this.pageInit();
    }

    pageInit() {
        if (this.loggedInUser == null) {
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
        }
        else {
            this.userDetails = "userId~" + this.loggedInUser.UserId;
            this._route.params.subscribe(
                params => {
                    let type: string = params['type'];

                    switch (type) {
                        case "personal":
                            this.docType = DocType.Personal;
                            break;
                        case "public":
                            this.docType = DocType.Public;
                            break;
                        default:
                            this.docType = DocType.Personal;
                            break;
                    }
                    if (this._route.snapshot.params['tag'] != null && this._route.snapshot.params['tag'] != '' && this._route.snapshot.params['id'] != 'undefined')
                        this.DocumentTagFilter = this._route.snapshot.params['tag'];
                    this.GetAllDocuments();
                });

        }
        this.busy = this._userService.getPermissions(this.rightsRequired, this.loggedInUser.UserId)
            .subscribe(data => {
                this.addEditDocument = data.indexOf("Edit Document") > -1;
                this.deleteDocument = data.indexOf("Delete Document") > -1;
            },
            error => {
            });
    }

    GetAllDocuments() {
        let showShared: boolean;

        if (this.docType === DocType.Personal) {
            showShared = false;
        }
        else if (this.docType === DocType.Public) {
            showShared = true;
        }
        this.busy = this._documentservice.getDocuments(this.loggedInUser.UserId, showShared)
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
                if (this.DocumentTagFilter != null && this.DocumentTagFilter != "")
                    this.filterDocuments();
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

    private upFilesData: FormData;
    private DocumentId: number;

    CheckInfileChange(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let formData: FormData = new FormData();
            formData.append("userId~" + this.loggedInUser.UserId, 1);
            formData.append("documentId~" + this.DocumentId, 1);
            formData.append("What~" + this.txtWhat, 1);
            formData.append("Why~" + this.txtWhy, 1);
            formData.append("revision~" + this.VersionRevision, 1);
            for (let i = 0; i < fileList.length; i++) {
                let file: File = fileList[i];
                formData.append('uploadFile', file, file.name);
            }
            //    event.srcElement.value = "";
            this.upFilesData = formData;
        }
    }

    SetdocumentId(docid) {
        this.DocumentId = docid;
        this.txtWhat = '';
        this.txtWhy = '';
    }

    SaveRevision() {

        this.busy = this._documentservice.uploadCheckedInFile(this.upFilesData)
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
                this.notificationTitle = 'Files checked in successfully.';
                this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
            });
    }
    onUpload(event) {
        //for (let file of event.files) {
        //    this.uploadedFiles.push(file);
        //}
        this.GetAllDocuments();
        this.notificationTitle = 'Files uploaded successfully.';
        this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
    }

    onError(event) {
        this.notificationTitle = 'Error in uploading files';
        this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);

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

    onDocTagInputBlur(event, id) {
        let tag: string = event.target.outerText.toString();
        if ((tag !== "") && (tag !== null) && (tag !== this.currentRowPrevValue)) {
            this.busy = this._documentservice.tagDocument(id, this.loggedInUser.UserId, tag)
                .subscribe(data => {
                },
                error => {
                    this.errorMessage = <any>error;
                    this.notificationTitle = this.errorMessage;
                    //this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                });
        }

    }

    onDocTagInputFocus(event, id) {
        this.currentRowPrevValue = event.target.outerText.toString();
    }

    //DownloadDoc(id, fileName) {

    //    this._documentservice.downloadFile().subscribe(blob => {

    //        //importedSaveAs(blob, '1.docx');
    //        var url = URL.createObjectURL(blob);
    //        this.downloadUrl = url;
    //        this.downloadFileName = '1.docx';
    //        //var linkElement = document.createElement('a');
    //        //linkElement.setAttribute('id', 'aDownload');
    //        //linkElement.setAttribute('href', url);
    //        //linkElement.setAttribute("download", '1.docx');
    //        document.getElementById('aDownload').click();

    //        //var downloadUrl = URL.createObjectURL(blob);
    //        //window.open(downloadUrl);
    //    });


    //    //this._documentservice.downloadFile().subscribe(blob => {
    //    //    debugger;
    //    //    var downloadUrl = URL.createObjectURL(blob);
    //    //    window.open(downloadUrl);
    //    //});
    //    //.subscribe(blob => {
    //    //    debugger;
    //    //    importedSaveAs(blob, fileName);
    //    //});
    //}
    DownloadDoc(id, fileName, extension, currentVersion, currentRevision) {
        this.busy = this._documentservice.downloadFile(id, currentVersion, currentRevision, this.loggedInUser.UserId)
            .subscribe(blob => {
                importedSaveAs(blob, fileName + extension);
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = this.errorMessage;
                this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            });

    }
}

