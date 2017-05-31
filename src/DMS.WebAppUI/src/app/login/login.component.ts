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
@Component({
    templateUrl: './login.component.html',
    providers: [UserService, SharedService, NotificationsService]
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
    public notificationOptions = GlobalVariable.notificationOptions;
    busy: Subscription;
    private currentUser: string;
    constructor(
        private router: Router,
        private _userService: UserService,
        private _sharedService:SharedService
    ) { }

    redirectToDashboard() {
        this.router.navigate(['/Registration']);
    }


    submitForm(event: Event): void {
        debugger
        let user: User = new User(0, this.email, this.password, '', '', true)
        this.busy = this._userService.getLoginUser(user).subscribe(
            data => {
                debugger
                if (data.result != null) {
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
                    debugger
                    this.notificationTitle = 'Invalid Login Attempt.';
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


    CancelClick() {
        this.isusernameClicked = false;
        this.isusernameValid = false;
        this.forgotname = '';
        document.getElementById('btndisputeModal').click();
    }
}