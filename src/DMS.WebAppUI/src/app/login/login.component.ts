
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser, User} from './login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent {
    private user: IUser;
    private username: string;
    private password: string;
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private errorMessage: string;
    busy: Subscription;
    constructor(
        private router: Router,
        private _userService: UserService
    ) { }

    redirectToDashboard() {
        this.router.navigate(['/Registration']);
    }


    submitForm(event: Event): void {
        debugger
        let user: User = new User(0, this.username, this.password, '', '', true)
        this.busy = this._userService.getLoginUser(user).subscribe(
            data => {
                if (data != null) {
                    this.user = data;
                    localStorage.setItem('currentUser', JSON.stringify(this.user));
                    this.router.navigate(['/dashboard']);
                }
                else {
                    this.notificationTitle = 'Invalid Login Attempt.';
                    //this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = this.errorMessage;
               // this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            },
            () => {
                //this.getLoginRoleRightsDetails(this.user.UserID);
                this.notificationTitle = 'Logged In successfully.';
                //this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
            }
        );

    }
}