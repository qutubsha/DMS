import { Component, Input, OnInit, ViewChild, trigger, transition, style, animate, state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDocument, Document, DocType } from './document';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DocumentService } from '../services/document.service';
import { IUser, User } from '../login/login';

import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ITagCount, TagCount } from '../document/tag';

@Component({
    selector: 'DMS-Tags',
    templateUrl: './tag.component.html',
    styleUrls: ['Tag.css']
})

export class TagComponent {

    private data: ITagCount[] = []; // data is the default name for Angular 2 datatable used in equipment listing
    busy: Subscription;
    private loggedInUser: IUser;
    private errorMessage: string;
    private notificationTitle: string = '';

    options: CloudOptions = {
        // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
        width: 1000,
        height: 400,
        overflow: false,
    }

    data1: Array<CloudData> = [
    ]

    constructor(
        private router: Router,
        private _documentservice: DocumentService
    ) { }

    ngOnInit(): void {
        debugger
        this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.loggedInUser == null) {
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
        }
        else {
            this.GetTags();
        }
    }

    GetTags() {
        
        this.busy = this._documentservice.getTags(this.loggedInUser.UserId)
            .subscribe(data => {
                this.data = data;
                var minCount = this.data[this.data.length - 1].Count;
                var MaxCount = this.data[0].Count;
                this.data1.length = 0;
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].Tag == "")
                        continue;
                    var weightPer = (this.data[i].Count / MaxCount) * 100;
                    var weight = 0;
                    if (weightPer > 90)
                        weight = 10;
                    else if (weightPer > 80)
                        weight = 9;
                    else if (weightPer > 70)
                        weight = 8;
                    else if (weightPer > 60)
                        weight = 7;
                    else if (weightPer > 50)
                        weight = 6;
                    else if (weightPer > 40)
                        weight = 5;
                    else if (weightPer > 30)
                        weight = 4;
                    else if (weightPer > 20)
                        weight = 3;
                    else if (weightPer > 10)
                        weight = 2;
                    else
                        weight = 1;
                    debugger;

                    this.data1.push({ text: this.data[i].Tag, link:  '/#/document/personal;tag=' + this.data[i].Tag, weight: weight });
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.notificationTitle = this.errorMessage;
            });
    }
}

