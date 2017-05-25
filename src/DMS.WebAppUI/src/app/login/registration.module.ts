
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { RegistrationComponent } from './registration.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        RegistrationComponent
    ],
    providers: [
        UserService
    ]
})
export class RegistrationModule { }
