import { Component, Input, OnInit, trigger, transition, style, animate, state, ViewChild } from '@angular/core';
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
    private rowsOnPage = GlobalVariable.rowsOnPage;
    private sortBy = 'Subject';
    private sortOrder = 'asc';
    private activePage = 1;
    private TemplateNameFilter = '';
    private SubjectFilter = '';
    private UpdatedByFilter = '';
    private UpdatedOnFilter = '';
    private IsActiveFilter = '';
    private filters: IDictionary[];
    private notificationTitle: string = '';
    private notificationContent: string = '';
    private ckeditorContent: string;
    private showAddForm: boolean = false;
    private EmailTemplateId: number;
    private currentUser: IUser;
    private ResetEmailTemplate: boolean = false;
    private UpdateEmailTemplate: boolean = false;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _emailtemplateService: EmailTemplateService,
        private _sharedService: SharedService,
        private _userService: UserService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
       
            let TemplateName = localStorage.getItem('CurrentEmailTemplateId');
            if (TemplateName != null) {
                this.initModel();

            } 
    }
    private initModel() {
        this.emailtemp = {
            TemplateName: '',
            EmailSubject: '',
            EmailBody: ''
        };
    }


    editEmployeetemplate(TemplateName) {
        debugger
        if (TemplateName != null) {
            this.busy = this._emailtemplateService.getEmailTemplateById(TemplateName)
                .subscribe(data => {
                    if (data != null) {
                        this.emailtemp = data;
                    }
                }, error => {
                    this.errorMessage = <any>error;
                    this.notificationTitle = 'Error in getting Badge Manager details.';
                    this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
                });

        }
    }

    submitForm(event: Event): void {
        event.preventDefault();
        //if (this.emailtemp.EmailTemplateId != 0 && this.emailtemp.EmailTemplateId != null) {
            {
                let saveUser: Template = new Template(this.emailtemp.TemplateName, this.emailtemp.EmailSubject, this.emailtemp.EmailBody);
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

            //this.cancelFormData();
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
