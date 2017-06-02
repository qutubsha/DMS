import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EqualValidator } from '../shared/appequal-validator.directive';
import { EmailTemplateComponent } from './email-template.component';
import { EmailTemplateService } from '../services/email-template.service';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/auth.guard';
import {EditorModule} from 'primeng/primeng';

@NgModule({
    imports: [
        SharedModule,
        EditorModule
    ],
    declarations: [
        EmailTemplateComponent
    ],
    providers: [
        EmailTemplateService
    ]
})
export class EmailTemplateModule {

}
