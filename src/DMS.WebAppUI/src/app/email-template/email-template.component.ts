import { Component, Input, OnInit, trigger, transition, style, animate, state, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { List, Enumerable } from '../shared/linq';
import { GlobalVariable, IDictionary } from '../shared/global';
import { EmailTemplateService } from '../services/email-template.service';
import { ITemplate, Template } from './email-template';
import { DataTable } from "angular2-datatable";
import { IUser, User } from '../login/login';
import { UserService } from '../services/user.service';

@Component({
    templateUrl: './email-template.component.html',
    providers: [SharedService, UserService]
})
export class EmailTemplateComponent implements OnInit {
    private BadgeId: string;
    private errorMessage: string;
    private emailtemplatedata: ITemplate[];
    private data: ITemplate[]; // data is the default name for Angular 2 datatable used in Department listing
    private emailtemp: ITemplate;
    busy: Subscription;
    private rowsOnPage = GlobalVariable.rowsOnPage;
    private sortBy = 'EmailTemplateName';
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
    @ViewChild('mf') mf: DataTable;
    private ckeditorContent: string;
    private showAddForm: boolean = false;
   // private EditEmailTemplate: boolean = false;
    private currentUser: IUser;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _emailtemplateService: EmailTemplateService,
        private _sharedService: SharedService,
        private _userService: UserService
    ) {
    }

    ngOnInit(): void {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //if (this.currentUser == null) {
        //    // remove user from local storage to log user out
        //    localStorage.removeItem('currentUser');
        //    this._router.navigate(['/login']);
        //}
        //else {
        //    this.EditEmailTemplate = false;
        //    this.initModel();
        //    this.pageInit();
        //}
        this.GetEmailTemplates();
    }

    private initModel() {
        //this.emailtemp = {
        //    EmailTemplateId: 0,
        //    TemplateName: '',
        //    Subject: '',
        //    Body: '',
        //    UpdatedBy: '',
        //    UpdatedOn: '',
        //    IsActive: true,
        //    Active:'',
        //    UserId: 0
        //};
    }

    pageInit() {
    }

    GetEmailTemplates() {
        this.showAddForm = false;
        this.busy = this._emailtemplateService.getEmailTemplates()
            .subscribe(data => {
                this.emailtemplatedata = data;
                this.data = data;
            },
            error => this.errorMessage = <any>error);
    }

    editEmployeetemplate(EmailTemplateName: any) {
        localStorage.setItem('CurrentEmailTemplateId', EmailTemplateName);
        this._router.navigate(['/edit-email-template'], { skipLocationChange: true });
    }

    //submitForm(event: Event): void {
    //    event.preventDefault();
    //    if (this.emailtemp.EmailTemplateId != 0 && this.emailtemp.EmailTemplateId != null) {
    //        {
    //            let saveUser: Template = new Template(this.emailtemp.EmailTemplateId, this.emailtemp.TemplateName, this.emailtemp.Subject, this.emailtemp.Body, '', '', true,'', this.emailtemp.UserId);
    //            this.busy = this._emailtemplateService.updateEmailTemplate(saveUser).subscribe(
    //                data => {
    //                    this.GetEmailTemplates();
    //                    return true;
    //                },
    //                error => {
    //                    this.errorMessage = <any>error;
    //                    this.notificationTitle = 'Error in updating Email Template.';
    //                    this._sharedService.createNotification(3, this.notificationTitle, this.notificationContent);
    //                },
    //                () => {
    //                    this.notificationTitle = 'Email Template updated successfully.';
    //                    this._sharedService.createNotification(1, this.notificationTitle, this.notificationContent);
    //                });
    //        }
    //    }
    //}

    //filteremialtemplatedetails(event: any) {
    //    let TemplateNameCodeFilter = this.TemplateNameFilter ? this.TemplateNameFilter.toLowerCase() : null;
    //    let SubjectCodeFilter = this.SubjectFilter ? this.SubjectFilter.toLowerCase() : null;
    //    let UpdatedByCodeFilter = this.UpdatedByFilter ? this.UpdatedByFilter.toLowerCase() : null;
    //    let UpdatedOnFilter = this.UpdatedOnFilter ? this.UpdatedOnFilter.toLowerCase() : null;
    //    let IsActiveCodeFilter = this.IsActiveFilter ? this.IsActiveFilter.toLowerCase() : null;

    //    this.filters = [];
    //    if (TemplateNameCodeFilter != null)
    //        this.filters.push({ key: 'TemplateName', value: TemplateNameCodeFilter });
    //    if (SubjectCodeFilter != null)
    //        this.filters.push({ key: 'Subject', value: SubjectCodeFilter });
    //    if (UpdatedByCodeFilter != null)
    //        this.filters.push({ key: 'UpdatedBy', value: UpdatedByCodeFilter });
    //    if (UpdatedOnFilter != null)
    //        this.filters.push({ key: 'UpdatedOn', value: UpdatedOnFilter });
    //    if (IsActiveCodeFilter != null)
    //        this.filters.push({ key: 'Active', value: IsActiveCodeFilter });

    //    this.emailtemplatedata = this.data;

    //    for (var i = 0; i < this.filters.length; i++) {
    //        let tempData: ITemplate[] = [];

    //        tempData = this.emailtemplatedata.filter((Template: ITemplate) =>
    //            Template[this.filters[i].key] != null && Template[this.filters[i].key] != '' &&
    //            Template[this.filters[i].key].toString().toLowerCase().indexOf(this.filters[i].value) != -1);
    //        this.emailtemplatedata = tempData;
    //    }

    //    this.resetPagination();
    //}

    // Resets the pagination for filtered data
    //public resetPagination() {
    //    this.mf.setPage(1, this.mf.rowsOnPage);
    //}

}
