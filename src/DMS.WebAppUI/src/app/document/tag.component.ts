import { Component, Input, OnInit, ViewChild, trigger, transition, style, animate, state } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDocument, Document, DocType } from './document';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DocumentService } from '../services/document.service';

import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
    selector : 'DMS-Tags',
    templateUrl: './tag.component.html',
    styleUrls: ['Tag.css']
    
})

export class TagComponent {
    options: CloudOptions = {
        // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
        width: 1000,
        height: 400,
        overflow: false,
    }

    data: Array<CloudData> = [
        { text: 'link1', link: 'https://google.com', weight: 5 },
        { text: 'link2', link: 'https://google.com', weight: 6 },
        { text: 'link3', link: 'https://google.com', weight: 8 },
        { text: 'link4', link: 'https://google.com', weight: 8 },
        { text: 'link5', link: 'https://google.com', weight: 9 }
    ]

    constructor(
        private router: Router
        
    ) { }
   
    ngOnInit(): void {

        
    }
    
}

