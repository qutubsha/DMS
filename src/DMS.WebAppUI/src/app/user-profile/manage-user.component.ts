import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IUserRegistration, UserRegistration, EditUserDetails, IUser, IUserDetails} from '../login/login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { DataTable } from "angular2-datatable";
import { GlobalVariable, IDictionary } from '../shared/global';
@Component({
    templateUrl: './manage-user.component.html',
})
export class UserComponent {


    private userdetailsdata: IUserDetails[];
   
    private edituserprofile: IUserDetails;

    private userdetailsdata: IUserDetails[];
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

    private isEditManageUser= false;

    @ViewChild('mf') mf: DataTable;
    constructor(
        private router: Router,
        private _userService: UserService
    ) { }

    ngOnInit(){
        //this.userdetailsdata= {
        //     ,
        //    Password: '',
        //    FirstName: '',
        //    LastName: '',
        //    Email: '',
        //};

        this.isEditManageUser = false;


        this.GetUserdetails();
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