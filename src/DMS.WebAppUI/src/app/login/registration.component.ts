
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserRegistration} from './login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
@Component({
    templateUrl: './registration.component.html',
})
export class RegistrationComponent {
    private userreg: IUserRegistration;
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private errorMessage: string;
    busy: Subscription;
    constructor(
        private router: Router,
        private _userService: UserService
    ) { }

    ngOnInit(){
        this.userreg = {
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
        debugger
    }
   
}