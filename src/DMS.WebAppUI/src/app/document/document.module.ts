import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DocumentComponent } from './document.component';
import { DocumentService } from '../services/document.service';
import {CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DocumentComponent
    ],
    providers: [
        DocumentService
    ]
})
export class  DocumentModule { }
