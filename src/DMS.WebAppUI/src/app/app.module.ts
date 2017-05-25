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
<<<<<<< HEAD
import { UserProfileModule } from './user-profile/user-profile.module';
=======
>>>>>>> 15f35f1f64ba5ff5b4e543ff6cc5f01ee6e0cf7a

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
<<<<<<< HEAD
        RegistrationModule,
        UserProfileModule
=======
        AccessHistoryModule,
        DocumentModule,

        RegistrationModule

>>>>>>> 15f35f1f64ba5ff5b4e543ff6cc5f01ee6e0cf7a
    ],
    providers: [
        AuthGuard,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        PathFinder
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
