/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { LowerValidator } from './compare-validator.directive';

describe('LowerValidator', () => {
    it('should create an instance', () => {
        const directive = new LowerValidator('', '');
        expect(directive).toBeTruthy();
    });
});
