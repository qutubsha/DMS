import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { AuthGuard } from '../shared/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { RolesService } from '../services/roles.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        RolesComponent
    ],
    providers: [
        RolesService
    ]
})
export class RolesModule { }
