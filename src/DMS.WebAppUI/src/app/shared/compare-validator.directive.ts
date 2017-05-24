import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateLower][formControlName],[validateLower][formControl],[validateLower][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => LowerValidator), multi: true }
    ]
})
export class LowerValidator implements Validator {
    constructor( @Attribute('validateLower') public validateLower: string,
        @Attribute('reverse') public reverse: string) {

    }

    private get isReverse() {
        if (!this.reverse) return false;
        return this.reverse === 'true' ? true : false;
    }

    validate(c: any): { [key: string]: any } {
        if (c.value != null && c.value != undefined && c.value != '') {
            // self value
            let v = new Date(c.value.date.month + '-' + c.value.date.day + '-' + c.value.date.year);

            // control vlaue
            let e = c.root.get(this.validateLower);

            // Compare whether End Date is lower than Start Date, if so, then set errors
            if (this.isReverse && e != null && e.value != null && e.value != undefined && e.value != '' && v <= new Date(e.value.date.month + '-' + e.value.date.day + '-' + e.value.date.year)) {
                e.setErrors(null);
                e.setErrors({
                    validateLower: false
                })
            }

            // Compare whether Start Date is greater than End Date, if so, then set errors
            if (!this.isReverse && e != null && e.value != undefined && e.value != '' && v >= new Date(e.value.date.month + '-' + e.value.date.day + '-' + e.value.date.year)) {
                e.setErrors(null);
                e.setErrors({
                    validateLower: false
                })
            }

            // If validated properly, then remove errors
            if (this.isReverse && e != null && e.value != undefined && e.value != '' && v > new Date(e.value.date.month + '-' + e.value.date.day + '-' + e.value.date.year)) {
                if (e.errors != null) {
                    delete e.errors['validateLower'];
                    if (!Object.keys(e.errors).length) e.setErrors(null);
                }
            }

            // If validated properly, then remove errors
            if (!this.isReverse && e != null && e.value != undefined && e.value != '' && v < new Date(e.value.date.month + '-' + e.value.date.day + '-' + e.value.date.year)) {
                if (e.errors != null) {
                    delete e.errors['validateLower'];
                    if (!Object.keys(e.errors).length) e.setErrors(null);
                }
            }
        }
        return null;
    }
}
