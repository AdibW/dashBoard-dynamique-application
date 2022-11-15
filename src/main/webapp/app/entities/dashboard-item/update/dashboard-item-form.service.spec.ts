import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dashboard-item.test-samples';

import { DashboardItemFormService } from './dashboard-item-form.service';

describe('DashboardItem Form Service', () => {
  let service: DashboardItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardItemFormService);
  });

  describe('Service methods', () => {
    describe('createDashboardItemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDashboardItemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            x: expect.any(Object),
            y: expect.any(Object),
            rows: expect.any(Object),
            col: expect.any(Object),
            item: expect.any(Object),
            items: expect.any(Object),
          })
        );
      });

      it('passing IDashboardItem should create a new form with FormGroup', () => {
        const formGroup = service.createDashboardItemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            x: expect.any(Object),
            y: expect.any(Object),
            rows: expect.any(Object),
            col: expect.any(Object),
            item: expect.any(Object),
            items: expect.any(Object),
          })
        );
      });
    });

    describe('getDashboardItem', () => {
      it('should return NewDashboardItem for default DashboardItem initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDashboardItemFormGroup(sampleWithNewData);

        const dashboardItem = service.getDashboardItem(formGroup) as any;

        expect(dashboardItem).toMatchObject(sampleWithNewData);
      });

      it('should return NewDashboardItem for empty DashboardItem initial value', () => {
        const formGroup = service.createDashboardItemFormGroup();

        const dashboardItem = service.getDashboardItem(formGroup) as any;

        expect(dashboardItem).toMatchObject({});
      });

      it('should return IDashboardItem', () => {
        const formGroup = service.createDashboardItemFormGroup(sampleWithRequiredData);

        const dashboardItem = service.getDashboardItem(formGroup) as any;

        expect(dashboardItem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDashboardItem should not enable id FormControl', () => {
        const formGroup = service.createDashboardItemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDashboardItem should disable id FormControl', () => {
        const formGroup = service.createDashboardItemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
