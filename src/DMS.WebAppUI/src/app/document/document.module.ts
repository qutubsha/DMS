import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DocumentComponent } from './document.component';
import { DocumentService } from '../services/document.service';
import {SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        DocumentComponent
    ],
    providers: [
        DocumentService
    ]
})
export class  DocumentModule { }
