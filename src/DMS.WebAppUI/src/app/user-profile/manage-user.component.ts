﻿import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserRegistration, UserRegistration, EditUserDetails, IUser, IUserDetails} from '../login/login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { DataTable } from '../angular2-datatable/datatable';
import { GlobalVariable, IDictionary } from '../shared/global';
import { IRole, Role } from '../roles/roles';
import { RolesService } from '../services/roles.service';
import { IMultiSelectListOption } from '../shared/multiselect-list';
import { IMultiSelectSettings } from '../shared/multiselect-dropdown';
import { List, Enumerable } from '../shared/linq';
@Component({
    templateUrl: './manage-user.component.html',
})
export class UserComponent {
    private roles: IRole[];
    private userdetailsdata: IUserDetails[];
    private edituserprofile: IUserDetails;
    private userdetails: IUserDetails;
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private errorMessage: string;
    busy: Subscription;
    private data: IUserDetails[];
    private currentUser: IUserRegistration;
    private rowsOnPage = GlobalVariable.rowsOnPage;
    private sortBy = 'Email';
    private sortOrder = 'asc';
    private activePage = 1;
    private isEditManageUser = false;
    private Rolewiserights: IMultiSelectListOption[] = [];
    private selectedRolewiserights: number[] = [];
    private RolesForSearch: IRole[] = [];
    private rightsRequired: string = "Edit User";
    private canEditUser: boolean = false;
    private loggedInUser: IUser;

    @ViewChild('mf') mf: DataTable;
    constructor(
        private router: Router,
        private _userService: UserService,
        private _roleService: RolesService
    ) { }

    ngOnInit(){
        //this.userdetailsdata= {
        //     ,
        //    Password: '',
        //    FirstName: '',
        //    LastName: '',
        //    Email: '',
        //};
        this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isEditManageUser = false;
        this.GetUserdetails();
        this.selectedRolewiserights = [];
        this.getroledetails();

        this.busy = this._userService.getPermissions(this.rightsRequired, this.loggedInUser.UserId)
            .subscribe(data => {
                this.canEditUser = data.indexOf("Edit User") > -1;
            },
            error => {
            });
      //  this.getRightsList();
    }

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
              //  this.Isvalid(false);
            },
            error => this.errorMessage = <any>error
            );
    }

    redirectToDashbord() {
        this.router.navigate(['/dashboard']);
    }


    GetUserdetails() {
        this.busy = this._userService.getuserlist()
            .subscribe(data => {
                this.userdetailsdata = data;
               this.data = data;
            },
            error => this.errorMessage = <any>error);
    }


    edituserdetails(Email: any) {
       
        if (Email != null && Email != 0) {
            this.busy = this._userService.getUserById(Email)
                .subscribe(data => {                   
                    if (data.Result != null) {
                        this.edituserprofile = data.Result;
                        this.isEditManageUser = true;
                        
                    }
                }, error => {
                    this.errorMessage = <any>error;
                    this.notificationTitle = 'Error in getting User details.';
                    
                });
        }
    }
    submitForm(event: Event): void {
       
        let upUserpro: EditUserDetails = new EditUserDetails(this.edituserprofile.Roles, this.edituserprofile.UserId, this.edituserprofile.UserName, '', '', this.edituserprofile.FirstName, this.edituserprofile.LastName, this.edituserprofile.Email, this.edituserprofile.IsActive, this.edituserprofile.IsDeleted, '');
        this.busy = this._userService.updateuserByAdmin(upUserpro).subscribe(
            data => {
                this.isEditManageUser = false;
                this.GetUserdetails();
                this.router.navigate(['/userdetails']);
                
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = 'Error in Updating User.';
                //  this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            },
            () => {
                this.isEditManageUser = false;
                this.notificationTitle = 'User Updated successfully.';
                //  this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
            });

    }

}