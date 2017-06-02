import { Component, OnInit } from '@angular/core';
import { IRight, Right, IRole, Role } from './roles';
import { RolesService } from '../services/roles.service';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IMultiSelectListOption } from '../shared/multiselect-list';
import { IMultiSelectSettings } from '../shared/multiselect-dropdown';
import { GlobalVariable } from '../shared/global';
import { List, Enumerable } from '../shared/linq';

@Component({
    templateUrl: './rights.component.html',
    providers: [SharedService]
})

export class RightsComponent {
    private Rolewiserights: IMultiSelectListOption[] = [];
    private selectedRolewiserights: number[] = [];
    busy: Subscription;
    private RolesForSearch: IRole[] = [];
    private errorMessage: string;
    private selectedRole: number = 0;
    private searchFormSubmitted: boolean = false;
    private searchFormSubmitteds: boolean = false;
    private isEditManageRights: boolean = false;
    private notificationTitle: string = '';
    private notificationContent: string = '';

    constructor(
        private _sharedService: SharedService,
        private router: Router,
        private _roleService: RolesService
    ) {
    }

    ngOnInit(): void {

        this.selectedRole = 0;
        this.selectedRolewiserights = [];
        this.getroledetails();
        this.getRightsList();
    }


    // gets Role from Web API and binds to ManageRole list
    getroledetails() {
        this.busy = this._roleService.getRoles()
            .subscribe(data => {
                this.RolesForSearch = new List<IRole>(data).OrderBy(x => x.RoleName.toLowerCase()).ToArray();
            },
            error => this.errorMessage = <any>error
            );
    }

    getRightsList() {
        this.busy = this._roleService.getRights()
            .subscribe(data => {
                let rightsList: IMultiSelectListOption[] = [];
                data.forEach(function (value: any) {
                    let singleRight: IMultiSelectListOption = { id: value.RightId, name: value.RightName };
                    rightsList.push(singleRight);
                });
                this.Rolewiserights = new List<IMultiSelectListOption>(rightsList).OrderBy(x => x.id).ToArray();
                this.Isvalid(false);
            },
            error => this.errorMessage = <any>error
            );
    }

    getrolewiserights(id: any) {
        if (id == 0) {
            this.cancelFormData();
        }

        let rights = new List<IRole>(this.RolesForSearch).Where(x => x.RoleId == id).Select(x => x.Rights).ToArray()[0];
        this.selectedRolewiserights = [];
        this.isEditManageRights = false;
        if (rights != null) {
            for (var i = 0; i < rights.length; i++) {
                this.selectedRolewiserights.push(rights[i].RightId);
                this.isEditManageRights = true;
            }
        }
    }

    Isvalid(searchformval: boolean) {
        if (this.selectedRole != null && this.selectedRole == 0) {
            this.searchFormSubmitted = searchformval;
            return;
        }
        if (this.isEditManageRights == false) {
            if (this.selectedRolewiserights.length == 0 && this.selectedRolewiserights != []) {
                this.searchFormSubmitteds = searchformval;
                return;
            }
        }

        if (searchformval == true) {
            document.getElementById('btnrightsModal').click();
            this.isEditManageRights = true;
        }
    }


    // Reset form data
    cancelFormData() {

        this.isEditManageRights = false;
        this.searchFormSubmitted = false;
        this.searchFormSubmitteds = false;
        this.selectedRole = 0;
        this.selectedRolewiserights = [];
    }

    AddEditRoleRights(): void {
        if (this.isEditManageRights) {
            if (this.selectedRole != null && this.selectedRole != 0) {
                var tempSelectedRole = this.RolesForSearch.filter(x => x.RoleId == this.selectedRole)[0];
                let rightsList: IRight[] = [];
                for (var i = 0; i < this.selectedRolewiserights.length; i++) {
                    var rightName = this.Rolewiserights.filter(x => x.id == this.selectedRolewiserights[i])[0].name;
                    let singleRight: IRight = { RightId: this.selectedRolewiserights[i], RightName: rightName };
                    rightsList.push(singleRight);
                }

                let saveRole: IRole = new Role(this.selectedRole, tempSelectedRole.RoleName, tempSelectedRole.IsActive, tempSelectedRole.CreatedOn, tempSelectedRole.UpdatedOn, rightsList);
                this.busy = this._roleService.updateRole(saveRole).subscribe(
                    data => {
                        this.getroledetails();
                        return true;
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.notificationTitle = 'Error in creating Rolewise rights.';
                        this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                    },
                    () => {
                        this.notificationTitle = 'Rolewise rights Upadated successfully.';
                        this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
                        this.cancelFormData();
                    });
            }
            else {
                this.Isvalid(true);
            }
        }
        else {
            if (this.selectedRole != null && this.selectedRole != 0 && this.selectedRolewiserights.length != 0 &&
                (this.selectedRolewiserights != [])) {
                var tempSelectedRole = this.RolesForSearch.filter(x => x.RoleId == this.selectedRole)[0];
                let rightsList: IRight[] = [];
                for (var i = 0; i < this.selectedRolewiserights.length; i++) {
                    var rightName = this.Rolewiserights.filter(x => x.id == this.selectedRolewiserights[i])[0].name;
                    let singleRight: IRight = { RightId: this.selectedRolewiserights[i], RightName: rightName };
                    rightsList.push(singleRight);
                }

                let saveRole: IRole = new Role(this.selectedRole, tempSelectedRole.RoleName, tempSelectedRole.IsActive, tempSelectedRole.CreatedOn, tempSelectedRole.UpdatedOn, rightsList);
                this.busy = this._roleService.updateRole(saveRole).subscribe(
                    data => {
                        this.getroledetails();
                        return true;
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.notificationTitle = 'Error in creating Rolewise rights.';
                        this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                    },
                    () => {
                        this.notificationTitle = 'Rolewise rights created successfully.';
                        this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
                        this.cancelFormData();
                    });
            }
            else {
                this.Isvalid(true);
            }
        }

    }

}