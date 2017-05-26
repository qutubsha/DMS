import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EqualValidator } from '../shared/appequal-validator.directive';
//import { DataTableModule } from '../angular2-datatable/datatable.module';
import { DataTableModule } from "angular2-datatable";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
@NgModule({
    imports: [
        Ng2Bs3ModalModule,
        CommonModule
    ],
    declarations: [EqualValidator],
    exports: [
        CommonModule,
        Ng2Bs3ModalModule,
        DataTableModule,
        FormsModule,

        FormsModule,
        EqualValidator


    ]
})
export class SharedModule { }
