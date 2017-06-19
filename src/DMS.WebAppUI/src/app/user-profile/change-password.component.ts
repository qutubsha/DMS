import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdatePassword, IUpdatePassword, IUser } from '../login/login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { SharedService } from '../shared/shared.service';
import { GlobalVariable } from '../shared/global';
import { NotificationsService, SimpleNotificationsComponent, PushNotificationsService } from 'angular2-notifications';
@Component({
    templateUrl: './change-password.component.html',
    providers: [UserService, SharedService, NotificationsService]
})
export class ChangePasswordComponent {
    private passupdate: IUpdatePassword;
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private errorMessage: string;
    private currentUser: IUser;
    public notificationOptions = GlobalVariable.notificationOptions;
    busy: Subscription;
    constructor(
        private router: Router,
        private _userService: UserService,
        private _sharedService: SharedService
    ) { }

    ngOnInit(){
        this.passupdate = {
            oldPwd:'',
            newPwd:'',
            RepeatPassword: '',
            eMail:''
        };
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.passupdate.eMail = this.currentUser.Email;
    }
    redirectToDashbord() {
        this.router.navigate(['/dashboard']);
    }
    submitForm(event: Event): void {
        let upUser: UpdatePassword = new UpdatePassword(this.passupdate.oldPwd, this.passupdate.newPwd, this.passupdate.RepeatPassword, this.passupdate.eMail);
        this.busy = this._userService.updatepassword(upUser).subscribe(
            data => {
                debugger
                if (data.Result != false) {
                    localStorage.removeItem('currentUser');
                    this.router.navigate(['/login']);
                    return true;
                }
                else {
                    this.notificationTitle = 'Invalid Old Password.';
                    this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                }
            },
            error => {
                debugger
                this.errorMessage = <any>error;
                this.notificationTitle = 'Error in Updating User.';
                this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            },
        );

    }
}