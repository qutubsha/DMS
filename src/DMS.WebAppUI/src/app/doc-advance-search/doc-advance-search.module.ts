import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocAdvanceSearchComponent } from './doc-advance-search.component';
import { AuthGuard } from '../shared/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { DocAdvanceSearchService } from '../services/doc-advance-search.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        DocAdvanceSearchComponent
    ],
    providers: [
        DocAdvanceSearchService
    ]
})
export class DocAdvanceSearchModule { }
