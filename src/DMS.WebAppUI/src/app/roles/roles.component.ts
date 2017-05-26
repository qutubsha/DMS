import { Component, OnInit } from '@angular/core';
import { IRole, Role } from './roles';
import { RolesService } from '../services/roles.service';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DataTable } from "angular2-datatable";
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './roles.component.html',
    providers: [SharedService]
})

export class RolesComponent {
    private roles: IRole[];
    private notificationTitle: string = '';
    private notificationContent: string = '';
    busy: Subscription;
    private errorMessage: string;

    constructor(
        private _sharedService: SharedService,
        private router: Router,
        private _roleService: RolesService
    ) {
    }

    ngOnInit(): void {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //if (this.currentUser == null) {
        //    // remove user from local storage to log user out
        //    localStorage.removeItem('currentUser');
        //    this.router.navigate(['/login']);
        //}
        //else {
           
            this.pageInit();
        //}
    }

    pageInit() {
        this.busy = this._roleService.getRoles()
            .subscribe(data => {
                this.roles = data;
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = 'Error in fetching Roles.';
                this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            });
    }
}