import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DashboardItemFormService } from './dashboard-item-form.service';
import { DashboardItemService } from '../service/dashboard-item.service';
import { IDashboardItem } from '../dashboard-item.model';
import { IWidget } from 'app/entities/widget/widget.model';
import { WidgetService } from 'app/entities/widget/service/widget.service';
import { IDashboard } from 'app/entities/dashboard/dashboard.model';
import { DashboardService } from 'app/entities/dashboard/service/dashboard.service';

import { DashboardItemUpdateComponent } from './dashboard-item-update.component';

describe('DashboardItem Management Update Component', () => {
  let comp: DashboardItemUpdateComponent;
  let fixture: ComponentFixture<DashboardItemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dashboardItemFormService: DashboardItemFormService;
  let dashboardItemService: DashboardItemService;
  let widgetService: WidgetService;
  let dashboardService: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DashboardItemUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DashboardItemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DashboardItemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dashboardItemFormService = TestBed.inject(DashboardItemFormService);
    dashboardItemService = TestBed.inject(DashboardItemService);
    widgetService = TestBed.inject(WidgetService);
    dashboardService = TestBed.inject(DashboardService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Widget query and add missing value', () => {
      const dashboardItem: IDashboardItem = { id: 'CBA' };
      const item: IWidget = { id: '549e26ab-25bb-49c8-b1eb-f1e4481bd531' };
      dashboardItem.item = item;

      const widgetCollection: IWidget[] = [{ id: 'ed612a03-f845-4828-971f-b0fa9bd69bb6' }];
      jest.spyOn(widgetService, 'query').mockReturnValue(of(new HttpResponse({ body: widgetCollection })));
      const additionalWidgets = [item];
      const expectedCollection: IWidget[] = [...additionalWidgets, ...widgetCollection];
      jest.spyOn(widgetService, 'addWidgetToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dashboardItem });
      comp.ngOnInit();

      expect(widgetService.query).toHaveBeenCalled();
      expect(widgetService.addWidgetToCollectionIfMissing).toHaveBeenCalledWith(
        widgetCollection,
        ...additionalWidgets.map(expect.objectContaining)
      );
      expect(comp.widgetsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Dashboard query and add missing value', () => {
      const dashboardItem: IDashboardItem = { id: 'CBA' };
      const items: IDashboard = { id: '6e890eb4-c04f-4852-840b-ce048b937037' };
      dashboardItem.items = items;

      const dashboardCollection: IDashboard[] = [{ id: 'f205b632-3513-4565-af03-259226e456b1' }];
      jest.spyOn(dashboardService, 'query').mockReturnValue(of(new HttpResponse({ body: dashboardCollection })));
      const additionalDashboards = [items];
      const expectedCollection: IDashboard[] = [...additionalDashboards, ...dashboardCollection];
      jest.spyOn(dashboardService, 'addDashboardToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dashboardItem });
      comp.ngOnInit();

      expect(dashboardService.query).toHaveBeenCalled();
      expect(dashboardService.addDashboardToCollectionIfMissing).toHaveBeenCalledWith(
        dashboardCollection,
        ...additionalDashboards.map(expect.objectContaining)
      );
      expect(comp.dashboardsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dashboardItem: IDashboardItem = { id: 'CBA' };
      const item: IWidget = { id: 'a041276b-beda-40e4-95c8-17a9e9a97e08' };
      dashboardItem.item = item;
      const items: IDashboard = { id: 'd973be26-fbcc-48c8-8b62-bc0a463c41e8' };
      dashboardItem.items = items;

      activatedRoute.data = of({ dashboardItem });
      comp.ngOnInit();

      expect(comp.widgetsSharedCollection).toContain(item);
      expect(comp.dashboardsSharedCollection).toContain(items);
      expect(comp.dashboardItem).toEqual(dashboardItem);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDashboardItem>>();
      const dashboardItem = { id: 'ABC' };
      jest.spyOn(dashboardItemFormService, 'getDashboardItem').mockReturnValue(dashboardItem);
      jest.spyOn(dashboardItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dashboardItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dashboardItem }));
      saveSubject.complete();

      // THEN
      expect(dashboardItemFormService.getDashboardItem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dashboardItemService.update).toHaveBeenCalledWith(expect.objectContaining(dashboardItem));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDashboardItem>>();
      const dashboardItem = { id: 'ABC' };
      jest.spyOn(dashboardItemFormService, 'getDashboardItem').mockReturnValue({ id: null });
      jest.spyOn(dashboardItemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dashboardItem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dashboardItem }));
      saveSubject.complete();

      // THEN
      expect(dashboardItemFormService.getDashboardItem).toHaveBeenCalled();
      expect(dashboardItemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDashboardItem>>();
      const dashboardItem = { id: 'ABC' };
      jest.spyOn(dashboardItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dashboardItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dashboardItemService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareWidget', () => {
      it('Should forward to widgetService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(widgetService, 'compareWidget');
        comp.compareWidget(entity, entity2);
        expect(widgetService.compareWidget).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDashboard', () => {
      it('Should forward to dashboardService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(dashboardService, 'compareDashboard');
        comp.compareDashboard(entity, entity2);
        expect(dashboardService.compareDashboard).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
