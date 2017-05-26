import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccessHistoryComponent } from './accesshistory.component';
//import { DataTablesModule } from 'angular-datatables';
import {SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        AccessHistoryComponent
    ],
    providers: [
    ]
})
export class  AccessHistoryModule { }
