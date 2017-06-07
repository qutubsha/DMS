import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserRegistration, UserRegistration, IUser, IUserDetails} from '../login/login';
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

}