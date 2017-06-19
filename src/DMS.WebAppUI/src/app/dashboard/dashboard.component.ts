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
import { UserService } from '../services/user.service';
import { DocumentService } from '../services/document.service';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [SharedService, NotificationsService]
})
export class DashboardComponent implements OnInit {
    // default constructor of the Department class, initiate department service here
    constructor(
        private router: Router,
        private _sharedService: SharedService,
        private _userService: UserService,
        private _documentService: DocumentService
    ) { }
    busy: Subscription;
    private currentUser: IUser;
    private rightsRequired: string = "View Document";
    private viewDocument: boolean = false;
    private personalDocCount: number = 0;
    private publicDocCount: number = 0;
    private sharedByMeDocCount: number = 0;
    private sharedWithMeDocCount: number = 0;

    ngOnInit(): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.pageInit();

    }

    pageInit() {
        this.busy = this._userService.getPermissions(this.rightsRequired, this.currentUser.UserId)
            .subscribe(data => {
                this.viewDocument = data.indexOf("View Document") > -1;
                if (this.viewDocument) {  // get the document count only if users has rights to view documents
                    this.busy = this._documentService.getDocumentsCount(this.currentUser.UserId)
                        .subscribe(data => {
                            this.personalDocCount = data.personal;
                            this.publicDocCount = data.public;
                        },
                        error => {
                        });
                }
            },
            error => {
            });
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