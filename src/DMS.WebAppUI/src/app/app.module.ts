
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
<<<<<<< HEAD
import { DocumentModule } from './document/document.module';


=======
import { PathFinder } from './path-finder';
import { RegistrationModule } from './login/registration.module';
>>>>>>> 90f7e16e461324117ed4334dc97372e1cc35ae60
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
        DocumentModule
=======
        RegistrationModule
>>>>>>> 90f7e16e461324117ed4334dc97372e1cc35ae60
    ],
    providers: [
        AuthGuard,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        PathFinder
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
