
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        UserService
    ]
})
export class LoginModule { }
