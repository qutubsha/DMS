import { Injectable } from '@angular/core';
import { NotificationsService, SimpleNotificationsComponent, PushNotificationsService } from 'angular2-notifications';

@Injectable()
export class SharedService {
    //default constructor
    constructor(private _notificationService: NotificationsService) { }

    // Angular 2 notications method for showing UI notifications
    createNotification(type: number, notificationTitle: string, notificationContent: string) {
        switch (type) {
            case 1: // success
                this._notificationService.success(notificationTitle, notificationContent);
                break;
            case 2: // alert
                this._notificationService.alert(notificationTitle, notificationContent);
                break;
            case 3: // error
                this._notificationService.error(notificationTitle, notificationContent);
                break;
            case 4: // info
                this._notificationService.info(notificationTitle, notificationContent);
                break;
            case 5: // bare
                this._notificationService.bare(notificationTitle, notificationContent);
                break;
        }
    }
}