import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SecureComponent } from './layout/secure/secure.component';
import { PublicComponent } from './layout/public/public.component';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthGuard } from './shared/auth.guard';
import { DocumentModule } from './document/document.module';
import { AccessHistoryModule } from './accesshistory/accesshistory.module';
import { PathFinder } from './path-finder';
import { RegistrationModule } from './login/registration.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { RolesModule } from './roles/roles.module';
import { SimpleNotificationsModule, PushNotificationsModule } from 'angular2-notifications';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { ChangePasswordModule } from './user-profile/change-password.module';
import { RecaptchaModule } from 'ng2-recaptcha';
import { VersionHistoryModule } from './versionhistory/versionhistory.module';
import { EmailTemplateModule } from './email-template/email-template.module';
import { EditEmailTemplateModule } from './email-template/edit-email-template.module';
import { UserModule } from './user-profile/manage-user.module';
import { ConfigurationSettingsModule } from './configuration-settings/configuration-settings.module';
import { DocAdvanceSearchModule } from './doc-advance-search/doc-advance-search.module';
import { SharedDocumentModule } from './shared-document/shared-document.module';
@NgModule({
    declarations: [
        AppComponent,
        PublicComponent,
        SecureComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        LoginModule,
        DashboardModule,
        RegistrationModule,
        UserProfileModule,
        AccessHistoryModule,
        DocumentModule,
        RegistrationModule,
        RolesModule,
        SimpleNotificationsModule,
        PushNotificationsModule,
        ChangePasswordModule,
        RecaptchaModule.forRoot(),
        VersionHistoryModule,
        EmailTemplateModule,
        EditEmailTemplateModule,
        UserModule,
        ConfigurationSettingsModule,
        DocAdvanceSearchModule,
        SharedDocumentModule
    ],
    providers: [
        AuthGuard,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        PathFinder
    ],
    exports: [BusyModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
