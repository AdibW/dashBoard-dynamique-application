import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WidgetTypeFormService } from './widget-type-form.service';
import { WidgetTypeService } from '../service/widget-type.service';
import { IWidgetType } from '../widget-type.model';
import { IDataSource } from 'app/entities/data-source/data-source.model';
import { DataSourceService } from 'app/entities/data-source/service/data-source.service';

import { WidgetTypeUpdateComponent } from './widget-type-update.component';

describe('WidgetType Management Update Component', () => {
  let comp: WidgetTypeUpdateComponent;
  let fixture: ComponentFixture<WidgetTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let widgetTypeFormService: WidgetTypeFormService;
  let widgetTypeService: WidgetTypeService;
  let dataSourceService: DataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WidgetTypeUpdateComponent],
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
      .overrideTemplate(WidgetTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WidgetTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    widgetTypeFormService = TestBed.inject(WidgetTypeFormService);
    widgetTypeService = TestBed.inject(WidgetTypeService);
    dataSourceService = TestBed.inject(DataSourceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call DataSource query and add missing value', () => {
      const widgetType: IWidgetType = { id: 'CBA' };
      const widgetType: IDataSource = { id: '589debb6-4634-4efe-8db1-7f4b6a1c8a8a' };
      widgetType.widgetType = widgetType;

      const dataSourceCollection: IDataSource[] = [{ id: 'ff8d2c19-7de1-47ac-bbcf-f1585893863c' }];
      jest.spyOn(dataSourceService, 'query').mockReturnValue(of(new HttpResponse({ body: dataSourceCollection })));
      const additionalDataSources = [widgetType];
      const expectedCollection: IDataSource[] = [...additionalDataSources, ...dataSourceCollection];
      jest.spyOn(dataSourceService, 'addDataSourceToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ widgetType });
      comp.ngOnInit();

      expect(dataSourceService.query).toHaveBeenCalled();
      expect(dataSourceService.addDataSourceToCollectionIfMissing).toHaveBeenCalledWith(
        dataSourceCollection,
        ...additionalDataSources.map(expect.objectContaining)
      );
      expect(comp.dataSourcesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const widgetType: IWidgetType = { id: 'CBA' };
      const widgetType: IDataSource = { id: '092b308c-84f5-4d31-bde4-1331609f5e9d' };
      widgetType.widgetType = widgetType;

      activatedRoute.data = of({ widgetType });
      comp.ngOnInit();

      expect(comp.dataSourcesSharedCollection).toContain(widgetType);
      expect(comp.widgetType).toEqual(widgetType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWidgetType>>();
      const widgetType = { id: 'ABC' };
      jest.spyOn(widgetTypeFormService, 'getWidgetType').mockReturnValue(widgetType);
      jest.spyOn(widgetTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ widgetType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: widgetType }));
      saveSubject.complete();

      // THEN
      expect(widgetTypeFormService.getWidgetType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(widgetTypeService.update).toHaveBeenCalledWith(expect.objectContaining(widgetType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWidgetType>>();
      const widgetType = { id: 'ABC' };
      jest.spyOn(widgetTypeFormService, 'getWidgetType').mockReturnValue({ id: null });
      jest.spyOn(widgetTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ widgetType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: widgetType }));
      saveSubject.complete();

      // THEN
      expect(widgetTypeFormService.getWidgetType).toHaveBeenCalled();
      expect(widgetTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWidgetType>>();
      const widgetType = { id: 'ABC' };
      jest.spyOn(widgetTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ widgetType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(widgetTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDataSource', () => {
      it('Should forward to dataSourceService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(dataSourceService, 'compareDataSource');
        comp.compareDataSource(entity, entity2);
        expect(dataSourceService.compareDataSource).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
