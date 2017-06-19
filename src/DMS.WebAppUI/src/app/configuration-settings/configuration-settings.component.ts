import { Component, OnInit } from '@angular/core';
import { IConfigurationSetting, ConfigurationSetting } from './configuration-settings';
import { ConfigurationSettingsService } from '../services/configuration-settings.service';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DataTable } from '../angular2-datatable/datatable';
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalVariable, IDictionary } from '../shared/global';

@Component({
    templateUrl: './configuration-settings.component.html',
    providers: [SharedService]
})

export class ConfigurationSettingsComponent {

    private singleConfigSetting: IConfigurationSetting;
    private notificationTitle: string = '';
    private notificationContent: string = '';
    busy: Subscription;
    private errorMessage: string;
    constructor(
        private _sharedService: SharedService,
        private router: Router,
        private _configSettingService: ConfigurationSettingsService
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
        this.singleConfigSetting = { ConfSettingId: 1, EncryptionKey: "", Repository: "", Size: 0 };
        this.pageInit();
        //}
    }

    pageInit() {
        this.busy = this._configSettingService.getConfigSettings()
            .subscribe(data => {
                debugger;
                this.singleConfigSetting = data;
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = 'Error in fetching Configuration Setings.';
                this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            });
    }

    UpdateConfigSetting() {
        debugger;
        console.log(this.singleConfigSetting);
        let newConfigSetting: ConfigurationSetting = new ConfigurationSetting(this.singleConfigSetting.ConfSettingId, this.singleConfigSetting.EncryptionKey, this.singleConfigSetting.Repository, this.singleConfigSetting.Size);
        this.busy = this._configSettingService.updateConfigSettings(newConfigSetting)
            .subscribe(data => {
                setTimeout(() => {
                    this.pageInit();  //fetch the ConfigSetting from server in grid to reflect changes after updating a ConfigSetting.
                });
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = 'Error in updating Configuration Setting.';
                this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
            },
            () => {
                this.notificationTitle = 'Configuration Setting updates successfully.';
                this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
            });

    }
}