import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../api-bannette.test-samples';

import { ApiBannetteFormService } from './api-bannette-form.service';

describe('ApiBannette Form Service', () => {
  let service: ApiBannetteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBannetteFormService);
  });

  describe('Service methods', () => {
    describe('createApiBannetteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createApiBannetteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            apiInitialLoad: expect.any(Object),
            apiSearch: expect.any(Object),
          })
        );
      });

      it('passing IApiBannette should create a new form with FormGroup', () => {
        const formGroup = service.createApiBannetteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            apiInitialLoad: expect.any(Object),
            apiSearch: expect.any(Object),
          })
        );
      });
    });

    describe('getApiBannette', () => {
      it('should return NewApiBannette for default ApiBannette initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createApiBannetteFormGroup(sampleWithNewData);

        const apiBannette = service.getApiBannette(formGroup) as any;

        expect(apiBannette).toMatchObject(sampleWithNewData);
      });

      it('should return NewApiBannette for empty ApiBannette initial value', () => {
        const formGroup = service.createApiBannetteFormGroup();

        const apiBannette = service.getApiBannette(formGroup) as any;

        expect(apiBannette).toMatchObject({});
      });

      it('should return IApiBannette', () => {
        const formGroup = service.createApiBannetteFormGroup(sampleWithRequiredData);

        const apiBannette = service.getApiBannette(formGroup) as any;

        expect(apiBannette).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IApiBannette should not enable id FormControl', () => {
        const formGroup = service.createApiBannetteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewApiBannette should disable id FormControl', () => {
        const formGroup = service.createApiBannetteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
