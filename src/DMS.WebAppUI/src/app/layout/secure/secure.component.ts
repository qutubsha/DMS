import { Component, OnInit } from '@angular/core';
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
    public notificationOptions = GlobalVariable.notificationOptions;

}

