import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { IUser, User } from '../../login/login';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService, SimpleNotificationsComponent, PushNotificationsService } from 'angular2-notifications';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { Routes, RouterModule } from '@angular/router';
import { GlobalVariable } from '../../shared/global';
@Component({
    selector: 'app-secure',
    templateUrl: './secure.component.html',
    providers: [NotificationsService]
})
export class SecureComponent {
    private currentUser: IUser;

    constructor(
        private router: Router
       
    ) { }

    ngOnInit(): void {
        debugger
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.currentUser.FirstName)

    }
    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
    public notificationOptions = GlobalVariable.notificationOptions;
}

