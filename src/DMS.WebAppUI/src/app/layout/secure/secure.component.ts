import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { Routes, RouterModule } from '@angular/router';
import { IUser, User } from '../../login/login';
import { Router, ActivatedRoute } from '@angular/router';
=======
import { NotificationsService, SimpleNotificationsComponent, PushNotificationsService } from 'angular2-notifications';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { Routes, RouterModule } from '@angular/router';
import { GlobalVariable } from '../../shared/global';

>>>>>>> e9990789cc69124ca9e5ae7c620086ad671a70cc
@Component({
    selector: 'app-secure',
    templateUrl: './secure.component.html',
    providers: [NotificationsService]
})
export class SecureComponent {
<<<<<<< HEAD
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
=======
    public notificationOptions = GlobalVariable.notificationOptions;

>>>>>>> e9990789cc69124ca9e5ae7c620086ad671a70cc
}

