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

<<<<<<< .merge_file_a17144

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
=======
    // gets Equipments from Web API and binds to Equipment list 
    getCheckedOutEquipments() {

        //this.busy = this._equipmentService.getCheckedOutEquipments()
        //    .subscribe(data => {
        //        // this.data = data;
        //        this.data = data;
        //        for (var i = 0; i < this.data.length; i++) {
        //            if (this.data[i].LastCheckoutTime != null && this.data[i].LastCheckoutTime != undefined && this.data[i].LastCheckoutTime != "") {
        //                this.data[i].LastCheckoutTime = this._sharedService.parseDateTimeToStringWithFormat(this.data[i].LastCheckoutTime);
        //            }
        //        }
        //        this.filteredData = this.data;
        //    },
        //    error => {
        //        this.errorMessage = <any>error;
        //        this.notificationTitle = this.errorMessage;
        //        this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
        //    });
    }

    filerDocuments()
    { }
    //filterDocuments() {
    //    let FileNameFilter = this.FileNameFilter ? this.FileNameFilter.toLocaleLowerCase() : null;
    //    let ExtensionFilter = this.ExtensionFilter ? this.ExtensionFilter.toLocaleLowerCase() : null;
    //    let CreatedByFilter = this.CreatedByFilter ? this.CreatedByFilter.toLocaleLowerCase() : null;
    //    let IsSharedFilter = this.IsSharedFilter ? this.IsSharedFilter.toLocaleLowerCase() : null;


    //    this.filters = [];
    //    if (FileNameFilter != null)
    //        this.filters.push({ key: 'FileName', value: FileNameFilter });
    //    if (ExtensionFilter != null)
    //        this.filters.push({ key: 'Extension', value: ExtensionFilter });
    //    if (CreatedByFilter != null)
    //        this.filters.push({ key: 'CreatedBy', value: CreatedByFilter});
    //    if (IsSharedFilter != null)
    //        this.filters.push({ key: 'IsShared', value: IsSharedFilter });

    //    this.filteredData = this.data;

    //    for (var i = 0; i < this.filters.length; i++) {
    //        let tempData: IDocument[];
    //        //if (this.filters[i].key == 'LastCheckoutTime') {
    //        //    alert(this.filters[i].value);
    //        //    tempData = this.filteredData.filter((equipment: IEquipment) =>
    //        //        equipment['LastCheckoutTime'] != null && equipment['LastCheckoutTime'].toString() != '' &&
    //        //        this._sharedService.parseDateTimeToStringWithFormat(equipment['LastCheckoutTime'].toString()).toString().startsWith(this.filters[i].value.toString()));
    //        //}
    //        //else
    //        {
    //            tempData = this.filteredData.filter((equipment: IDocument) =>
    //                equipment[this.filters[i].key] != null && equipment[this.filters[i].key].toString() != '' &&
    //                equipment[this.filters[i].key].toString().toLocaleLowerCase().indexOf(this.filters[i].value.toString()) != -1);
    //        }
    //        this.filteredData = tempData;
    //    }

    //}
>>>>>>> .merge_file_a19276


}



export interface IDictionary {
    key: string;
    value: string;
}