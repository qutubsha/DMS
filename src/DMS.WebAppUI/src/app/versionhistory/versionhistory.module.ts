import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VersionHistoryComponent } from './versionhistory.component';
//import { DataTablesModule } from 'angular-datatables';
import {SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        VersionHistoryComponent
    ],
    providers: [
    ]
})
export class  VersionHistoryModule { }
