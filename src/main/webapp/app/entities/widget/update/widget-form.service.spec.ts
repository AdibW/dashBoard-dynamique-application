import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../widget.test-samples';

import { WidgetFormService } from './widget-form.service';

describe('Widget Form Service', () => {
  let service: WidgetFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetFormService);
  });

  describe('Service methods', () => {
    describe('createWidgetFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWidgetFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            title: expect.any(Object),
            componentName: expect.any(Object),
            componentType: expect.any(Object),
            widget: expect.any(Object),
          })
        );
      });

      it('passing IWidget should create a new form with FormGroup', () => {
        const formGroup = service.createWidgetFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            title: expect.any(Object),
            componentName: expect.any(Object),
            componentType: expect.any(Object),
            widget: expect.any(Object),
          })
        );
      });
    });

    describe('getWidget', () => {
      it('should return NewWidget for default Widget initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWidgetFormGroup(sampleWithNewData);

        const widget = service.getWidget(formGroup) as any;

        expect(widget).toMatchObject(sampleWithNewData);
      });

      it('should return NewWidget for empty Widget initial value', () => {
        const formGroup = service.createWidgetFormGroup();

        const widget = service.getWidget(formGroup) as any;

        expect(widget).toMatchObject({});
      });

      it('should return IWidget', () => {
        const formGroup = service.createWidgetFormGroup(sampleWithRequiredData);

        const widget = service.getWidget(formGroup) as any;

        expect(widget).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWidget should not enable id FormControl', () => {
        const formGroup = service.createWidgetFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWidget should disable id FormControl', () => {
        const formGroup = service.createWidgetFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
