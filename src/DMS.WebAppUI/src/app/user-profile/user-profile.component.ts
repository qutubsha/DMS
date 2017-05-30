﻿import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserRegistration, UserRegistration } from '../login/login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
@Component({
    templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
    private userprofile: IUserRegistration;
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private errorMessage: string;
    busy: Subscription;
    constructor(
        private router: Router,
        private _userService: UserService
    ) { }

    ngOnInit(){
        this.userprofile = {
            UserID: 0,
            UserName: '',
            Password: '',
            RepeatPassword: '',
            FirstName: '',
            LastName: '',
            Email: '',
        };

    }
    submitForm(event: Event): void {
        let saveUser: UserRegistration = new UserRegistration(this.userprofile.UserID, '', this.userprofile.Password, '', this.userprofile.FirstName, this.userprofile.LastName, this.userprofile.Email);
        this.busy = this._userService.addUser(saveUser).subscribe(
            data => {
                debugger
                this.router.navigate(['/dashboard']);
                return true;
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = 'Error in Updating User.';
              //  this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            },
            () => {
                debugger
                this.notificationTitle = 'User Updated successfully.';
              //  this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
            });

    }
}