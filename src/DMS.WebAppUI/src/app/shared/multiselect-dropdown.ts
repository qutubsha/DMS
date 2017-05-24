/*
 * Angular 2 Dropdown Multiselect for Bootstrap
 *
 * Simon Lindh
 * https://github.com/softsimon/angular-2-dropdown-multiselect
 */

import {
    NgModule,
    Component,
    Pipe,
    OnInit,
    DoCheck,
    HostListener,
    Input,
    ElementRef,
    Output,
    EventEmitter,
    forwardRef,
    IterableDiffers
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const MULTISELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiselectDropdown),
    multi: true
};

export interface IMultiSelectOption {
    id: any;
    name: string;
}

export interface IMultiSelectSettings {
    pullRight?: boolean;
    enableSearch?: boolean;
    checkedStyle?: 'checkboxes' | 'glyphicon';
    buttonClasses?: string;
    selectionLimit?: number;
    closeOnSelect?: boolean;
    autoUnselect?: boolean;
    showCheckAll?: boolean;
    showUncheckAll?: boolean;
    dynamicTitleMaxItems?: number;
    maxHeight?: string;
    DisableField?: boolean;
}

export interface IMultiSelectTexts {
    checkAll?: string;
    uncheckAll?: string;
    checked?: string;
    checkedPlural?: string;
    searchPlaceholder?: string;
    defaultTitle?: string;
}

@Pipe({
    name: 'searchFilter'
})
export class MultiSelectSearchFilter {
    transform(options: Array<IMultiSelectOption>, args: string): Array<IMultiSelectOption> {
        return options.filter((option: IMultiSelectOption) => option.name.toLowerCase().indexOf((args || '').toLowerCase()) > -1);
    }
}

@Component({
    selector: 'ss-multiselect-dropdown',
    providers: [MULTISELECT_VALUE_ACCESSOR],
    styles: [`
		a { outline: none !important; }
	`],
    template: `
<div>
        <div class="btn-group multiple_select">
            <button type="button" class="dropdown-toggle multiple_selectbtn form-control" [ngClass]="settings.buttonClasses" 
            (click)="toggleDropdown()" value={{title}} [disabled]="DisableField">{{ title }}<span class="caret"></span></button>
            <ul *ngIf="isVisible && options.length > 0" class="dropdown-menu multi_ul" [class.pull-right]="settings.pullRight" 
            [style.max-height]="settings.maxHeight" style="display: block; height: auto; overflow-y: auto;">
                <li class="dropdown-item" style="margin: 0px 5px 5px 5px;" *ngIf="settings.enableSearch">
                    <div class="input-group input-group-sm multi-search">
                        <span class="input-group-addon" id="sizing-addon3"><i class="fa fa-search"></i></span>
                        <input type="text" class="form-control" placeholder="{{ texts.searchPlaceholder }}" 
                        aria-describedby="sizing-addon3" [(ngModel)]="searchFilterText">
                        <span class="input-group-btn" *ngIf="searchFilterText.length > 0">
                            <button class="btn btn-default" type="button" (click)="clearSearch()"><i class="fa fa-times"></i></button>
                        </span>
                    </div>
                </li>
                <li class="dropdown-item">
                    <a href="javascript:;" role="menuitem" tabindex="-1" (click)="checkAll(settings.showCheckAll)">
                         <input *ngIf="settings.checkedStyle == 'checkboxes'" id="checkAllCheckbox" type="checkbox" [checked]="settings.showCheckAll" />
                    <span *ngIf="settings.checkedStyle == 'glyphicon'" style="width: 16px;" 
                        class="glyphicon" [class.glyphicon-ok]="isSelected(texts.checkAll)"></span>        
                            {{ texts.checkAll }}
                    </a>
                </li>
                
                <li class="dropdown-item" *ngFor="let option of options | searchFilter:searchFilterText">
                    <a href="javascript:;" role="menuitem" tabindex="-1" (click)="setSelected($event, option)">
                        <input *ngIf="settings.checkedStyle == 'checkboxes'" type="checkbox" [checked]="isSelected(option)" />
                        <span *ngIf="settings.checkedStyle == 'glyphicon'" style="width: 16px;" 
                        class="glyphicon" [class.glyphicon-ok]="isSelected(option)"></span>
                        {{ option.name }}
                    </a>
                </li>
            </ul>
        </div></div>
    `
})
export class MultiselectDropdown implements OnInit, DoCheck, ControlValueAccessor {

    @Input() options: Array<IMultiSelectOption>;
    @Input() settings: IMultiSelectSettings;
    @Input() texts: IMultiSelectTexts;
    @Input() DisableField: Boolean;
    @Output() selectionLimitReached = new EventEmitter();
    @Output() dropdownClosed = new EventEmitter();

    @HostListener('document: click', ['$event.target'])
    onClick(target: HTMLElement) {
        let parentFound = false;
        while (target != null && !parentFound) {
            if (target === this.element.nativeElement) {
                parentFound = true;
            }
            target = target.parentElement;
        }
        if (!parentFound) {
            this.isVisible = false;
            this.dropdownClosed.emit();
        }
    }

    onModelChange: Function = (_: any) => {
    };
    onModelTouched: Function = () => {
    };
    model: number[];
    title: string;
    differ: any;
    numSelected: number = 0;
    isVisible: boolean = false;
    searchFilterText: string = '';
    defaultSettings: IMultiSelectSettings = {
        pullRight: false,
        enableSearch: true,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default',
        selectionLimit: 0,
        closeOnSelect: false,
        autoUnselect: false,
        showCheckAll: false,
        dynamicTitleMaxItems: 1,
        maxHeight: '300px',
        DisableField: false
    };
    defaultTexts: IMultiSelectTexts = {
        checkAll: '[Select all]',
        uncheckAll: '[DeSelect all]',
        checked: 'selected',
        checkedPlural: 'selected',
        searchPlaceholder: 'Search...',
        defaultTitle: 'Select',
    };

    constructor(private element: ElementRef,
        private differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    ngOnInit() {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.texts = Object.assign(this.defaultTexts, this.texts);
        this.title = this.texts.defaultTitle;
    }

    writeValue(value: any): void {
        if (value !== undefined) {
            this.model = value;
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.model);
        if (changes) {
            this.updateNumSelected();
            this.updateTitle();
        }
    }

    clearSearch() {
        this.searchFilterText = '';
    }

    toggleDropdown() {
        this.isVisible = !this.isVisible;
        if (!this.isVisible) {
            this.dropdownClosed.emit();
        }
    }

    isSelected(option: IMultiSelectOption): boolean {
        return this.model && this.model.indexOf(option.id) > -1;
    }

    setSelected(event: Event, option: IMultiSelectOption) {
        if (!this.model) {
            this.model = [];
        }
        var index = this.model.indexOf(option.id);
        if (index > -1) {
            this.model.splice(index, 1);
        } else {
            if (this.settings.selectionLimit === 0 || this.model.length < this.settings.selectionLimit) {
                this.model.push(option.id);
            } else {
                if (this.settings.autoUnselect) {
                    this.model.push(option.id);
                    this.model.shift();
                } else {
                    this.selectionLimitReached.emit(this.model.length);
                    return;
                }
            }
        }
        if (this.settings.closeOnSelect) {
            this.toggleDropdown();
        }
        this.onModelChange(this.model);
    }

    updateNumSelected() {
        this.numSelected = this.model && this.model.length || 0;
    }

    updateTitle() {
        if (this.numSelected === 0) {
            this.title = this.texts.defaultTitle;
            this.settings.showCheckAll = false;
        } else if (this.settings.dynamicTitleMaxItems >= this.numSelected) {
            let temptitle = this.options
                .filter((option: IMultiSelectOption) => this.model && this.model.indexOf(option.id) > -1)
                .map((option: IMultiSelectOption) => option.name)
                .join(', ');

            //if (temptitle.length > 13) {
            //    temptitle = temptitle.substring(0, 9);
            //    temptitle = temptitle + '...';
            //}
            this.title = temptitle;
            this.settings.showCheckAll = false;
        }
        else if (this.options.length == this.numSelected) {
            this.title = 'All ' + this.texts.checkedPlural;
            this.settings.showCheckAll = true;
        }
        else {
            this.title = this.numSelected + ' ' + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
            this.settings.showCheckAll = false;
        }
    }

    checkAll(checkedAll: boolean) {
        if (!checkedAll) {
            this.model = this.options.map(option => option.id);
            this.settings.showCheckAll = true;
            this.onModelChange(this.model);
        }
        else {
            this.model = [];
            this.settings.showCheckAll = false;
            this.onModelChange(this.model);
        }
    }

    //uncheckAll() {
    //    this.model = [];
    //    this.onModelChange(this.model);
    //}
}

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [MultiselectDropdown],
    declarations: [MultiselectDropdown, MultiSelectSearchFilter],
})
export class MultiselectDropdownModule {
}
