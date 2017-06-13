import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedDocumentComponent } from './shared-document.component';
import { AuthGuard } from '../shared/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { SharedDocumentsService } from '../services/shared-documents.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        SharedDocumentComponent
    ],
    providers: [
        SharedDocumentsService
    ]
})
export class SharedDocumentModule { }
