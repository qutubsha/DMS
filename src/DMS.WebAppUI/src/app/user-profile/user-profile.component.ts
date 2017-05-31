import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserRegistration, UserRegistration, IUser} from '../login/login';
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
    private currentUser: IUserRegistration;
    constructor(
        private router: Router,
        private _userService: UserService
    ) { }

    ngOnInit(){
        this.userprofile = {
            userid: 0,
            username: '',
            password: '',
            RepeatPassword: '',
            firstName: '',
            lastName: '',
            email: '',
        };
        debugger
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.editUserProfile(this.currentUser.email);
    }

    redirectToDashbord() {
        debugger
        this.router.navigate(['/dashboard']);
    }

    editUserProfile(email: any) {
        debugger
        if (email != null && email != 0) {
            this.busy = this._userService.getUserById(email)
                .subscribe(data => {
                    debugger
                    if (data.result != null) {
                        this.userprofile = data.result;
                    }
                }, error => {
                    this.errorMessage = <any>error;
                    this.notificationTitle = 'Error in getting User details.';
                   // this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                });
        }
    }
    submitForm(event: Event): void {
        debugger
        let upUserpro: UserRegistration = new UserRegistration(this.userprofile.userid, '', this.userprofile.password, '', this.userprofile.firstName, this.userprofile.lastName, this.userprofile.email);
        this.busy = this._userService.updateuser(upUserpro).subscribe(
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