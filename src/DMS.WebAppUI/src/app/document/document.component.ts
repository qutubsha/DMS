import { Component, Input, OnInit, ViewChild, trigger, transition, style, animate, state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { DataTable } from '../angular2-datatable/datatable';
import { IDocument, Document } from './document';
//import { DataTablesModule } from 'angular-datatables';

//import { GlobalVariable, IDictionary } from '../shared/global';
//import { IUser, User, IUserRoleRights } from './login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
@Component({
    templateUrl: './document.component.html',
})

export class DocumentComponent {

    /// Variables declaration
    private errorMessage: string;
    private data: IDocument[]; // data is the default name for Angular 2 datatable used in equipment listing
    private filteredData: IDocument[];
    private equipmentListFilter = '';
 //   private rowsOnPage = GlobalVariable.rowsOnPage;
    private activePage = 1;
    private sortBy = 'FileName';
    private sortOrder = 'asc';
    private equipment: IDocument;
    private FileNameFilter = '';
    private ExtensionFilter = '';
    private CreatedByFilter = '';
    private IsSharedFilter = '';
    private closeOpenEquipmentUrl: string = 'assets/images/sort_close.png';
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private filters: IDictionary[];
    //private currentUser: IUser;
    //busy: Subscription;
    //@ViewChild('mf') mf: DataTable; // used for resetting datatable paging Index after filtering data
    private SearchEquipment: boolean = false;

    // default constructor of the Equipment class, initiate Equipment service here
    constructor(private router: Router) {
    }

    // onInit method for the Equipment class, initialize Equipment data used for binding UI form fields, 
    // call getEquipments service for binding list Equipment 
    ngOnInit(): void {
        
    }

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

    filterDocuments() {
        let FileNameFilter = this.FileNameFilter ? this.FileNameFilter.toLocaleLowerCase() : null;
        let ExtensionFilter = this.ExtensionFilter ? this.ExtensionFilter.toLocaleLowerCase() : null;
        let CreatedByFilter = this.CreatedByFilter ? this.CreatedByFilter.toLocaleLowerCase() : null;
        let IsSharedFilter = this.IsSharedFilter ? this.IsSharedFilter.toLocaleLowerCase() : null;


        this.filters = [];
        if (FileNameFilter != null)
            this.filters.push({ key: 'FileName', value: FileNameFilter });
        if (ExtensionFilter != null)
            this.filters.push({ key: 'Extension', value: ExtensionFilter });
        if (CreatedByFilter != null)
            this.filters.push({ key: 'CreatedBy', value: CreatedByFilter});
        if (IsSharedFilter != null)
            this.filters.push({ key: 'IsShared', value: IsSharedFilter });

        this.filteredData = this.data;

        for (var i = 0; i < this.filters.length; i++) {
            let tempData: IDocument[];
            //if (this.filters[i].key == 'LastCheckoutTime') {
            //    alert(this.filters[i].value);
            //    tempData = this.filteredData.filter((equipment: IEquipment) =>
            //        equipment['LastCheckoutTime'] != null && equipment['LastCheckoutTime'].toString() != '' &&
            //        this._sharedService.parseDateTimeToStringWithFormat(equipment['LastCheckoutTime'].toString()).toString().startsWith(this.filters[i].value.toString()));
            //}
            //else
            {
                tempData = this.filteredData.filter((equipment: IDocument) =>
                    equipment[this.filters[i].key] != null && equipment[this.filters[i].key].toString() != '' &&
                    equipment[this.filters[i].key].toString().toLocaleLowerCase().indexOf(this.filters[i].value.toString()) != -1);
            }
            this.filteredData = tempData;
        }

    }


    // Resets the pagination for filtered data
    public resetPagination() {
      //  this.mf.setPage(1, this.mf.rowsOnPage);
    }
}



export interface IDictionary {
    key: string;
    value: string;
}