import { Component, Input, OnInit, ViewChild } from '@angular/core';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { IUser, User } from '../login/login';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    // default constructor of the Department class, initiate department service here
    constructor(private router: Router) {
    }

    private currentUser: IUser;
    ngOnInit(): void {
        debugger
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


    }
}