import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
//import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: [
        //SharedModule,
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
    ]
})
export class LoginModule { }
