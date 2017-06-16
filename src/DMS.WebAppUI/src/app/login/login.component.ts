import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser, User} from './login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { SharedService } from '../shared/shared.service';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NotificationsService, SimpleNotificationsComponent, PushNotificationsService } from 'angular2-notifications';
import { GlobalVariable } from '../shared/global';
import { RecaptchaLoaderService } from 'ng2-recaptcha';
import { BusyModule, BusyConfig } from 'angular2-busy';
@Component({
    templateUrl: './login.component.html',
    providers: [UserService, SharedService, RecaptchaLoaderService, NotificationsService]
})
export class LoginComponent {
    private user: IUser;
    private email: string;
    private password: string;
    private forgotpass: string;
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private errorMessage: string;
    private isusernameClicked: boolean = false;
    private isusernameValid: boolean = false;
    public notificationOptions = GlobalVariable.notificationOptions;
    busy: Subscription;
    public verified: any;
    public siteKey: string = "sitekey";//example: 6LdEnxQTfkdldc-Wa6iKZSelks823exsdcjX7A-N
    public theme: string = "light";//you can give any google themes light or dark
    setVerified(data) {
        console.log(data) // data will return true while successfully verified 
    }
    private currentUser: string;
    constructor(
        private router: Router,
        private _userService: UserService,
        private _sharedService: SharedService

    ) {
    }

    redirectToDashboard() {
        this.router.navigate(['/Registration']);
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
    }

    submitForm(event: Event): void {
        debugger
        let user: User = new User(0, this.email, this.password, '', '', true)
        this.busy = this._userService.getLoginUser(user).subscribe(
            data => {
                if (data.Result != null) {
                    this.user = data.Result;
                        localStorage.setItem('currentUser', JSON.stringify(this.user));
                        this.router.navigate(['/dashboard']);
                }
                else {
                    this.notificationTitle = 'Username/Password you entered is not valid.';
                    this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = this.errorMessage;
               this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            },
            
        );

    }

    SendMailOnForgotPassword() {
        this.isusernameClicked = true;
        if (this.forgotpass != null && this.forgotpass != '') {
            this.isusernameValid = true;
            this._userService.SendMailOnForgotPassword(this.forgotpass).subscribe(
                data => {
                    document.getElementById('btndisputeModal').click();
                    this.forgotpass = '';
                    return true;
                },
                error => {
                    this.errorMessage = <any>error;
                    this.notificationTitle = 'Error in Sending Email.';
                    this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                },
                () => {
                    this.notificationTitle = 'Sending Email successfully.';
                    this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
                });
            this.isusernameClicked = false;
            this.isusernameValid = false;
        }
    }

    CancelClick() {
        this.isusernameClicked = false;
        this.isusernameValid = false;
        this.forgotpass = '';
        document.getElementById('btndisputeModal').click();
    }
}