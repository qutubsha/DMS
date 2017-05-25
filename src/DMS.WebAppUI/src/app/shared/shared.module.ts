import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EqualValidator } from '../shared/appequal-validator.directive';
//import { DataTableModule } from '../angular2-datatable/datatable.module';
import { DataTableModule } from "angular2-datatable";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [EqualValidator],
    exports: [
        CommonModule,
        DataTableModule,
        FormsModule

    ]
})
export class SharedModule { }
