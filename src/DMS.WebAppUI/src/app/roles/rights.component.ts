import { Component, OnInit } from '@angular/core';
import { IRight, Right } from './roles';
import { RolesService } from '../services/roles.service';
import 'rxjs/Rx';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IMultiSelectListOption } from '../shared/multiselect-list';
import { IMultiSelectSettings } from '../shared/multiselect-dropdown';
import { GlobalVariable } from '../shared/global';

@Component({
    templateUrl: './rights.component.html',
    providers: [SharedService]
})

export class RightsComponent {
    private Rolewiserights: IMultiSelectListOption[] = [];
    private selectedRolewiserights: number[] = [];
    busy: Subscription;

}