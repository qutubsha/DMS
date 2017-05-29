import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { AuthGuard } from '../shared/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { RolesService } from '../services/roles.service';
import { RightsComponent } from './rights.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        RolesComponent, RightsComponent
    ],
    providers: [
        RolesService
    ]
})
export class RolesModule { }
