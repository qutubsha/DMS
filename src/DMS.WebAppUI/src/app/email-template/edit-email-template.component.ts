﻿import { Component, Input, OnInit, trigger, transition, style, animate, state, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { IMultiSelectSettings } from '../shared/multiselect-dropdown';
import { IMultiSelectListOption } from '../shared/multiselect-list';
import { List, Enumerable } from '../shared/linq';
import { GlobalVariable, IDictionary } from '../shared/global';
import { EmailTemplateService } from '../services/email-template.service';
import { ITemplate, Template } from './email-template';
import { IUser, User } from '../login/login';
import { UserService } from '../services/user.service';

@Component({
    templateUrl: './edit-email-template.component.html',
    providers: [SharedService, UserService],
})
export class EditEmailTemplateComponent implements OnInit {
    private errorMessage: string;
    private emailtemplatedata: ITemplate[];
    private emailtemp: ITemplate;
    busy: Subscription;
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private ckeditorContent: string;
    private showAddForm: boolean = false;
    private EmailTemplateId: number;
    private currentUser: IUser;
    private ResetEmailTemplate: boolean = false;
   // private UpdateEmailTemplate: boolean = false;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _emailtemplateService: EmailTemplateService,
        private _sharedService: SharedService,
        private _userService: UserService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        debugger
        let EmailTemplateName = localStorage.getItem('CurrentEmailTemplateId');
        this.currentUser= JSON.parse(localStorage.getItem('currentUser'));
        if (EmailTemplateName != null) {
                this.initModel();
                this.editEmployeetemplate(EmailTemplateName);

            } 
    }
    private initModel() {
        this.emailtemp = {
            EmailTemplateName: '',
            EmailSubject: '',
            EmailBody: '',
            IsActive: true,
            UpdatedBy:''
        };
    }


    editEmployeetemplate(EmailTemplateName) {
        if (EmailTemplateName != null) {
            this.busy = this._emailtemplateService.getEmailTemplateById(EmailTemplateName)
                .subscribe(data => {
                    if (data != null) {
                        this.emailtemp = data;
                    }
                }, error => {
                    this.errorMessage = <any>error;
                    this.notificationTitle = 'Error in getting email template details.';
                    this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                });

        }
    }

    submitForm(event: Event): void {
        event.preventDefault();
        //if (this.emailtemp.EmailTemplateId != 0 && this.emailtemp.EmailTemplateId != null) {
        {
           
            this.emailtemp.UpdatedBy = this.currentUser.Email;
            debugger
            let saveUser: Template = new Template(this.emailtemp.EmailTemplateName, this.emailtemp.EmailSubject, this.emailtemp.EmailBody, this.emailtemp.IsActive, this.emailtemp.UpdatedBy);
               this.busy = this._emailtemplateService.updateEmailTemplate(saveUser).subscribe(
                    data => {
                        this._router.navigate(['/email-template'], { skipLocationChange: true });
                        return true;
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.notificationTitle = 'Error in updating Email Template.';
                        this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                    },
                    () => {
                        this.notificationTitle = 'Email Template updated successfully.';
                        this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
                    });
            }

            this.cancelFormData();
        //}
    }

    cancelFormData() {
        this._router.navigate(['/email-template'], { skipLocationChange: true });
    }
  

    // Resets the pagination for filtered data
  

    //resetTemplate() {
    //    if (this.emailtemp.EmailTemplateId != 0 && this.emailtemp.EmailTemplateId != null) {
    //        this.busy = this._emailtemplateService.resetTemplate(this.emailtemp.EmailTemplateId, this.currentUser.UserID).subscribe(
    //            data => {
    //                this._router.navigate(['/email-template'], { skipLocationChange: true });
    //                return true;
    //            },
    //            error => {
    //                this.errorMessage = <any>error;
    //                this.notificationTitle = 'Error in resetting Email Template.';
    //                this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
    //            },
    //            () => {
    //                this.notificationTitle = 'Email Template has been reset successfully.';
    //                this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
    //            });
    //    }
    //}

}
