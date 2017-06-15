import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TagComponent } from './tag.component';

import {SharedModule } from '../shared/shared.module';
import { TagCloudModule } from 'angular-tag-cloud-module';

@NgModule({
    imports: [
        SharedModule, TagCloudModule
    ],
    declarations: [
        TagComponent
    ],
    providers: [
        
    ],
    exports: [
        TagComponent
    ]
})
export class  TagModule { }
