import { Component, Input, OnInit, ViewChild } from '@angular/core';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { IUser, User } from '../login/login';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsService, SimpleNotificationsComponent, PushNotificationsService } from 'angular2-notifications';
import { SharedService } from '../shared/shared.service';
import { TagModule } from '../document/tag.module';
import { TagComponent} from '../document/tag.component';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [SharedService, NotificationsService]
})
export class DashboardComponent implements OnInit {
    // default constructor of the Department class, initiate department service here
    constructor(
        private router: Router,
        private _sharedService: SharedService
    ) { }
    busy: Subscription;
    private currentUser: IUser;
    ngOnInit(): void {
        debugger
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


    }

    NavigateToPersonalDocs() {
        this.router.navigate(['/document/personal']);
    }

    NavigateToPublicDocs() {
        this.router.navigate(['/document/public']);
    }

    NavigateToMySharedDocs() {
        this.router.navigate(['/shared-documents/mine']);
    }

    NavigateToOthersSharedDocs() {
        this.router.navigate(['/shared-documents/others']);
    }
}