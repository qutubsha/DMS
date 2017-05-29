import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser, User} from './login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NotificationsService, SimpleNotificationsComponent, PushNotificationsService } from 'angular2-notifications';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent {
    private user: IUser;
    private email: string;
    private password: string;
    private forgotname: string;
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private errorMessage: string;
    private isusernameClicked: boolean = false;
    private isusernameValid: boolean = false;
    busy: Subscription;
    private currentUser: string;
    constructor(
        private router: Router,
        private _userService: UserService
    ) { }

    redirectToDashboard() {
        this.router.navigate(['/Registration']);
    }


    submitForm(event: Event): void {

        let user: User = new User(0, this.email, this.password, '', '', true)
        this.busy = this._userService.getLoginUser(user).subscribe(
            data => {
                if (data != null) {
                    debugger
                    //if (data.isSuccess) {
                    //    alert(data.isSuccess)
                    this.user = data.result;
                       
                        localStorage.setItem('currentUser', JSON.stringify(this.user));
                        this.router.navigate(['/dashboard']);
                    //}
                    //else {
                    //    alert(data.message);
                    //}
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


    CancelClick() {
        this.isusernameClicked = false;
        this.isusernameValid = false;
        this.forgotname = '';
        document.getElementById('btndisputeModal').click();
    }
}