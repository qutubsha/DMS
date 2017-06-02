import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EqualValidator } from '../shared/appequal-validator.directive';
//import { DataTableModule } from '../angular2-datatable/datatable.module';
import { DataTableModule } from "angular2-datatable";
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BusyModule, BusyConfig } from 'angular2-busy';
import { MultiselectDropdownModule } from './multiselect-dropdown';
import { MultiselectListModule } from './multiselect-list';
import { RecaptchaModule } from 'ng2-recaptcha';
import { CommonModalComponent } from '../modal/modal.component';

@NgModule({
    imports: [
        Ng2Bs3ModalModule,
        CommonModule,
        SimpleNotificationsModule,
        RecaptchaModule.forRoot()
    ],
    declarations: [EqualValidator, CommonModalComponent],
    exports: [
        CommonModule,
        Ng2Bs3ModalModule,
        DataTableModule,
        FormsModule,
        SimpleNotificationsModule,
        FormsModule,
        EqualValidator,
        BusyModule,
        MultiselectDropdownModule,
        MultiselectListModule,
        RecaptchaModule,
        CommonModalComponent
    ]
})
export class SharedModule {

   
}
