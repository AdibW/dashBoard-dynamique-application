import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../widget-type.test-samples';

import { WidgetTypeFormService } from './widget-type-form.service';

describe('WidgetType Form Service', () => {
  let service: WidgetTypeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetTypeFormService);
  });

  describe('Service methods', () => {
    describe('createWidgetTypeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWidgetTypeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            widgetType: expect.any(Object),
          })
        );
      });

      it('passing IWidgetType should create a new form with FormGroup', () => {
        const formGroup = service.createWidgetTypeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            widgetType: expect.any(Object),
          })
        );
      });
    });

    describe('getWidgetType', () => {
      it('should return NewWidgetType for default WidgetType initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWidgetTypeFormGroup(sampleWithNewData);

        const widgetType = service.getWidgetType(formGroup) as any;

        expect(widgetType).toMatchObject(sampleWithNewData);
      });

      it('should return NewWidgetType for empty WidgetType initial value', () => {
        const formGroup = service.createWidgetTypeFormGroup();

        const widgetType = service.getWidgetType(formGroup) as any;

        expect(widgetType).toMatchObject({});
      });

      it('should return IWidgetType', () => {
        const formGroup = service.createWidgetTypeFormGroup(sampleWithRequiredData);

        const widgetType = service.getWidgetType(formGroup) as any;

        expect(widgetType).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWidgetType should not enable id FormControl', () => {
        const formGroup = service.createWidgetTypeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWidgetType should disable id FormControl', () => {
        const formGroup = service.createWidgetTypeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
