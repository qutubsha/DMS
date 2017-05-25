import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccessHistoryComponent } from './accesshistory.component';
//import { DataTablesModule } from 'angular-datatables';
import {CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AccessHistoryComponent
    ],
    providers: [
    ]
})
export class  AccessHistoryModule { }
