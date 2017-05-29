
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserRegistration, UserRegistration} from './login';
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
            RepeatPassword:'',
            FirstName: '',
            LastName: '',
            Email: '',
        };

    }
    
    submitForm(event: Event): void {
        debugger
        let saveUser: UserRegistration = new UserRegistration(this.userreg.UserID, this.userreg.UserName, this.userreg.Password, this.userreg.RepeatPassword, '', '', this.userreg.Email);
        this.busy = this._userService.addUser(saveUser).subscribe(
                    data => {
                        this.router.navigate(['/dashboard']);
                        return true;
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.notificationTitle = 'Error in updating User.';
                       // this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                    },
                    () => {
                        this.notificationTitle = 'User updated successfully.';
                        //this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
                    });
           
    }
}