import { Component, OnInit } from '@angular/core';
import { IRole, Role } from './roles';
import { RolesService } from '../services/roles.service';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DataTable } from "angular2-datatable";
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalVariable, IDictionary } from '../shared/global';

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

    private filteredRoles: any[] = [];
    private sortBy: string = 'RoleName';
    private sortOrder: string = 'asc';
    private activePage = 1;
    private rowsOnPage = GlobalVariable.rowsOnPage;
    private RoleNameFilter = '';
    private IsActiveFilter = '';
    private filters: IDictionary[];

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
        let IsActiveFilter = this.IsActiveFilter ? this.IsActiveFilter.toLocaleLowerCase() : null;

        this.filters = [];
        if (RoleNameFilter != null)
            this.filters.push({ key: 'roleName', value: RoleNameFilter });
        if (IsActiveFilter != null)
            this.filters.push({ key: 'isActive', value: IsActiveFilter });

        this.filteredRoles = this.roles;

        for (var i = 0; i < this.filters.length; i++) {
            let tempData: IRole[];

            tempData = this.filteredRoles.filter((doc: IRole) =>
                doc[this.filters[i].key] != null && doc[this.filters[i].key].toString() != '' &&
                doc[this.filters[i].key].toString().toLocaleLowerCase().indexOf(this.filters[i].value.toString()) != -1);
            this.filteredRoles = tempData;
        }

    }
}