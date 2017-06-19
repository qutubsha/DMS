import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { IUser, User } from '../../login/login';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService, SimpleNotificationsComponent, PushNotificationsService } from 'angular2-notifications';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { Routes, RouterModule } from '@angular/router';
import { GlobalVariable } from '../../shared/global';
import { UserService } from '../../services/user.service';
import { List, Enumerable } from '../../shared/linq';
@Component({
    selector: 'app-secure',
    templateUrl: './secure.component.html',
    providers: [UserService, NotificationsService]
})
export class SecureComponent {
    private currentUser: IUser;
    private rightsRequired: string = "View Document,View Role,View User,Edit Email Template,Edit Right,Edit Configuration Setting";
    private viewDocument: boolean = false;
    private viewRole: boolean = false;
    private viewUser: boolean = false;
    private editEmailTemplate: boolean = false;
    private editRight: boolean = false;
    private editConfigSetting: boolean = false;
    private viewAdminMenu: boolean = false;
    busy: Subscription;
    constructor(
        private router: Router,
        private _userService: UserService
    ) { }

    ngOnInit(): void {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.currentUser.Email)
        this.pageInit();
    }

    pageInit() {
        this.busy = this._userService.getPermissions(this.rightsRequired, this.currentUser.UserId)
            .subscribe(data => {
                this.viewDocument = data.indexOf("View Document") > -1;
                this.viewRole = data.indexOf("View Role") > -1;
                this.viewUser = data.indexOf("View User") > -1;
                this.editEmailTemplate = data.indexOf("View Email Template") > -1;
                this.editRight = data.indexOf("Edit Right") > -1;
                this.editConfigSetting = data.indexOf("Edit Configuration Setting") > -1;
                this.viewAdminMenu = this.viewRole || this.viewUser || this.editEmailTemplate || this.editRight || this.editConfigSetting
            },
            error => {
            });
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
    public notificationOptions = GlobalVariable.notificationOptions;
}

