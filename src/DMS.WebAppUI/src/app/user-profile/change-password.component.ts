import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdatePassword, IUpdatePassword } from '../login/login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
@Component({
    templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
    private passupdate: IUpdatePassword;
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private errorMessage: string;
    busy: Subscription;
    constructor(
        private router: Router,
        private _userService: UserService
    ) { }

    ngOnInit(){
        this.passupdate = {
            oldPwd:'',
            newPwd:'',
            RepeatPassword: '',
            eMail:''
        };

    }
    submitForm(event: Event): void {
        debugger
        let upUser: UpdatePassword = new UpdatePassword(this.passupdate.oldPwd, this.passupdate.newPwd, this.passupdate.RepeatPassword, this.passupdate.eMail);
        this.busy = this._userService.updateUser(upUser).subscribe(
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