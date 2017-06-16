
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserRegistration, UserRegistration, IUser} from './login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { NotificationsService, SimpleNotificationsComponent, PushNotificationsService } from 'angular2-notifications';
import { SharedService } from '../shared/shared.service';
import { GlobalVariable } from '../shared/global';
@Component({
    templateUrl: './registration.component.html',
    providers: [UserService, SharedService, NotificationsService]
})
export class RegistrationComponent {
    private user: IUser;
    private userreg: IUserRegistration;
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private errorMessage: string;
    public notificationOptions = GlobalVariable.notificationOptions;
    busy: Subscription;
    constructor(
        private router: Router,
        private _userService: UserService,
        private _sharedService: SharedService
    ) { }

    ngOnInit(){
        this.userreg = {
            UserId: 0,
            UserName: '',
            Password: '',
            RepeatPassword: '',
            FirstName: '',
            LastName: '',
            Email: '',
        };
    }

    redirectToLogin() {
        this.router.navigate(['/login']);
    }


    submitForm(event: Event): void {
        debugger
        let saveUser: UserRegistration = new UserRegistration(this.userreg.UserId, '', this.userreg.Password, this.userreg.RepeatPassword, '', '', this.userreg.Email);
        this.busy = this._userService.addUser(saveUser).subscribe(
            data => {
                if (data.Result != null) {
                    debugger
                    this.user = data.Result;
                    localStorage.setItem('currentUser', JSON.stringify(this.user));
                    this.router.navigate(['/userprofile']);
                    return true;
                } else
                {
                    this.notificationTitle = 'User already exists.';
                    this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                }
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.notificationTitle = 'Error in Creating User.';
                        this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            },
        );
           
    }
}