import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { SharedDocumentsService } from '../services/shared-documents.service';

import { DataTable } from '../angular2-datatable/datatable';
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalVariable, IDictionary } from '../shared/global';

@Component({
    templateUrl: './shared-document.component.html',
    providers: [SharedService]
})

export class SharedDocumentComponent {

    private shareDocType: string = "mine";

    constructor(
        private _sharedService: SharedService,
        private router: Router, private _sharedDocumentservice: SharedDocumentsService, private _route: ActivatedRoute) {
    }

    ngOnInit(): void {

        this._route.params.subscribe(
            params => {
                let type: string = params['type'];
                switch (type) {
                    case "mine":
                        this.shareDocType = "mine";
                        break;
                    case "others":
                        this.shareDocType = "others";
                        break;
                    default:
                        this.shareDocType = "mine";
                        break;
                }
            });
    }
}