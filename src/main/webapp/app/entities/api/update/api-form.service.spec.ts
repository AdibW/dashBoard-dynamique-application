import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../api.test-samples';

import { ApiFormService } from './api-form.service';

describe('Api Form Service', () => {
  let service: ApiFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFormService);
  });

  describe('Service methods', () => {
    describe('createApiFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createApiFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            api: expect.any(Object),
          })
        );
      });

      it('passing IApi should create a new form with FormGroup', () => {
        const formGroup = service.createApiFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            api: expect.any(Object),
          })
        );
      });
    });

    describe('getApi', () => {
      it('should return NewApi for default Api initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createApiFormGroup(sampleWithNewData);

        const api = service.getApi(formGroup) as any;

        expect(api).toMatchObject(sampleWithNewData);
      });

      it('should return NewApi for empty Api initial value', () => {
        const formGroup = service.createApiFormGroup();

        const api = service.getApi(formGroup) as any;

        expect(api).toMatchObject({});
      });

      it('should return IApi', () => {
        const formGroup = service.createApiFormGroup(sampleWithRequiredData);

        const api = service.getApi(formGroup) as any;

        expect(api).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IApi should not enable id FormControl', () => {
        const formGroup = service.createApiFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewApi should disable id FormControl', () => {
        const formGroup = service.createApiFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
