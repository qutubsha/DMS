import { Component, OnInit } from '@angular/core';
import { IRole, Role } from './roles';
import { RolesService } from '../services/roles.service';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DataTable } from "angular2-datatable";
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalVariable, IDictionary } from '../shared/global';
//import {DatepickerModule} from 'ng2-bootstrap';

@Component({
    templateUrl: './roles.component.html',
    providers: [SharedService]
})

export class RolesComponent {
    private roles: IRole[];
    private notificationTitle: string = '';
    private notificationContent: string = '';
    busy: Subscription;
    private errorMessage: string;

    private filteredRoles: IRole[] = [];
    private sortBy: string = 'RoleName';
    private sortOrder: string = 'asc';
    private activePage = 1;
    private rowsOnPage = GlobalVariable.rowsOnPage;
    private RoleNameFilter = '';
    private IsActiveFilter = '';
    private CreatedOnFilter = '';
    private filters: IDictionary[];

    private singleRole: IRole;
    private isEditMode: boolean = false;
    private showForm: boolean = true;

    constructor(
        private _sharedService: SharedService,
        private router: Router,
        private _roleService: RolesService
    ) {
    }

    ngOnInit(): void {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //if (this.currentUser == null) {
        //    // remove user from local storage to log user out
        //    localStorage.removeItem('currentUser');
        //    this.router.navigate(['/login']);
        //}
        //else {
        this.singleRole = { RoleId: 0, RoleName: "", IsActive: false, CreatedOn: "", UpdatedOn: "" };
        this.pageInit();
        //}
    }

    pageInit() {
        this.busy = this._roleService.getRoles()
            .subscribe(data => {
                this.roles = data;
                this.filteredRoles = data;
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = 'Error in fetching Roles.';
                this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            });
    }

    filterRoles() {
        let RoleNameFilter = this.RoleNameFilter ? this.RoleNameFilter.toLocaleLowerCase() : null;
        let CreatedOnDateFilter = this.CreatedOnFilter ? this.CreatedOnFilter.toLocaleLowerCase() : null;
        let IsActiveFilter = this.IsActiveFilter ? this.IsActiveFilter.toLocaleLowerCase() : null;

        this.filters = [];
        if (RoleNameFilter != null)
            this.filters.push({ key: 'RoleName', value: RoleNameFilter });
        if (IsActiveFilter != null)
            this.filters.push({ key: 'IsActive', value: IsActiveFilter });
        if (CreatedOnDateFilter != null)
            this.filters.push({ key: 'CreatedOn', value: CreatedOnDateFilter });
        this.filteredRoles = this.roles;

        for (var i = 0; i < this.filters.length; i++) {
            let tempData: IRole[];

            tempData = this.filteredRoles.filter((doc: IRole) =>
                doc[this.filters[i].key] != null && doc[this.filters[i].key].toString() != '' &&
                doc[this.filters[i].key].toString().toLocaleLowerCase().indexOf(this.filters[i].value.toString()) != -1);
            this.filteredRoles = tempData;
        }

    }

    resetFilters() {
        this.filters = [];
        this.RoleNameFilter = '';
        this.IsActiveFilter = '';
        this.CreatedOnFilter = '';
        this.filteredRoles = this.roles;
    }

    EditRole(role: IRole) {
        this.singleRole = { RoleId: role.RoleId, RoleName: role.RoleName, IsActive: role.IsActive, CreatedOn: role.CreatedOn, UpdatedOn: role.UpdatedOn };
        this.isEditMode = true;
    }

    AddOrUpdateRole() {
        console.log(this.singleRole);
        let newRole: Role = new Role(this.singleRole.RoleId, this.singleRole.RoleName, this.singleRole.IsActive, this.singleRole.CreatedOn, this.singleRole.UpdatedOn);
        if (this.isEditMode) {
            this.busy = this._roleService.updateRole(newRole)
                .subscribe(data => {
                    setTimeout(() => {
                        this.clearData();
                        this.showForm = false;
                        setTimeout(() => this.showForm = true, 0);
                        this.pageInit();  //fetch the roles from server in grid to reflect changes after updating a role.
                    });
                },
                error => {
                    this.errorMessage = <any>error;
                    this.notificationTitle = 'Error in updating Role.';
                    this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                });
        }
        else {
            this.busy = this._roleService.addRole(newRole)
                .subscribe(data => {
                    setTimeout(() => {
                        this.clearData();
                        this.showForm = false;
                        setTimeout(() => this.showForm = true, 0);
                        this.pageInit();  //fetch the roles from server in grid to reflect changes after adding a role.
                    });
                },
                error => {
                    this.errorMessage = <any>error;
                    this.notificationTitle = 'Error in adding Role.';
                    this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                });
        }
       
    }


    cancelForm() {
        setTimeout(() => {
            this.clearData();
            this.showForm = false;
            setTimeout(() => this.showForm = true, 0);
        });
    }

    clearData() {
        this.singleRole = { RoleId: 0, RoleName: "", IsActive: false, CreatedOn: "", UpdatedOn: "" };
        this.isEditMode = false;
    }

}