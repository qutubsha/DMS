import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../shared/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { TagModule } from '../document/tag.module';

@NgModule({
    imports: [
        SharedModule, TagModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [
        //DashboardService
    ]
})
export class DashboardModule { }
