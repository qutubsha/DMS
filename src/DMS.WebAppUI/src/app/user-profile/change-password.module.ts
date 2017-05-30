
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { ChangePasswordComponent } from './change-password.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        ChangePasswordComponent
    ],
    providers: [
        UserService
    ]
})
export class ChangePasswordModule { }
