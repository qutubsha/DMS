
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserProfileComponent } from './user-profile.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        UserProfileComponent
    ],
    providers: [
        UserService
    ]
})
export class UserProfileModule { }
