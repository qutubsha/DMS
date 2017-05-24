import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EqualValidator } from '../shared/appequal-validator.directive';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [EqualValidator],
    exports: [
        CommonModule,
        FormsModule

    ]
})
export class SharedModule { }
