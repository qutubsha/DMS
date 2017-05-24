import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../shared/auth.guard';

@NgModule({
    imports: [
        //SharedModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [
        //DashboardService
    ]
})
export class DashboardModule { }
