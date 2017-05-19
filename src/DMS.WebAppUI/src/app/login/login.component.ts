import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { IUser, User, IUserRoleRights } from './login';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent {
    constructor(
        private router: Router
    ) { }

    redirectToDashboard() {
        this.router.navigate(['/dashboard']);

    }
}