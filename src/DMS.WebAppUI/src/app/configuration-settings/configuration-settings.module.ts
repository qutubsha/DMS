import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigurationSettingsComponent } from './configuration-settings.component';
import { AuthGuard } from '../shared/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ConfigurationSettingsService } from '../services/configuration-settings.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ConfigurationSettingsComponent
    ],
    providers: [
        ConfigurationSettingsService
    ]
})
export class ConfigurationSettingsModule { }
