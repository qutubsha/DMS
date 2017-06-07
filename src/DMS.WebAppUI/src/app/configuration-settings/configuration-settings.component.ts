import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { DataTable } from "angular2-datatable";
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalVariable, IDictionary } from '../shared/global';

@Component({
    templateUrl: './configuration-settings.component.html',
    providers: [SharedService]
})

export class ConfigurationSettingsComponent {
}