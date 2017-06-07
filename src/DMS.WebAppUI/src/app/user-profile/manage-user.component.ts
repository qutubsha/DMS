import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserRegistration, UserRegistration, IUser} from '../login/login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
@Component({
    templateUrl: './manage-user.component.html',
})
export class UserComponent {
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
            UserId: 0,
            UserName: '',
            Password: '',
            RepeatPassword: '',
            FirstName: '',
            LastName: '',
            Email: '',
        };
       
    }

    redirectToDashbord() {
        this.router.navigate(['/dashboard']);
    }


}