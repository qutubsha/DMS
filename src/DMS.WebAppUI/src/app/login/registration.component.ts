
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserRegistration, UserRegistration} from './login';
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
            userid: 0,
            username: '',
            password: '',
            RepeatPassword:'',
            firstName: '',
            lastName: '',
            email: '',
        };

    }

    redirectToLogin() {
        this.router.navigate(['/login']);
    }


    submitForm(event: Event): void {
        debugger
        let saveUser: UserRegistration = new UserRegistration(this.userreg.userid, '', this.userreg.password, this.userreg.RepeatPassword, '', '', this.userreg.email);
        this.busy = this._userService.addUser(saveUser).subscribe(
            data => {
                debugger
                        this.router.navigate(['/dashboard']);
                        return true;
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.notificationTitle = 'Error in Creating User.';
                        this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                    },
                    () => {
                        debugger
                        this.notificationTitle = 'User Created successfully.';
                        this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
                    });
           
    }
}