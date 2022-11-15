import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WidgetFormService } from './widget-form.service';
import { WidgetService } from '../service/widget.service';
import { IWidget } from '../widget.model';
import { IWidgetType } from 'app/entities/widget-type/widget-type.model';
import { WidgetTypeService } from 'app/entities/widget-type/service/widget-type.service';

import { WidgetUpdateComponent } from './widget-update.component';

describe('Widget Management Update Component', () => {
  let comp: WidgetUpdateComponent;
  let fixture: ComponentFixture<WidgetUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let widgetFormService: WidgetFormService;
  let widgetService: WidgetService;
  let widgetTypeService: WidgetTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WidgetUpdateComponent],
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
      .overrideTemplate(WidgetUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WidgetUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    widgetFormService = TestBed.inject(WidgetFormService);
    widgetService = TestBed.inject(WidgetService);
    widgetTypeService = TestBed.inject(WidgetTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call WidgetType query and add missing value', () => {
      const widget: IWidget = { id: 'CBA' };
      const widget: IWidgetType = { id: '839438b0-10fc-48a9-986c-64ad030855e6' };
      widget.widget = widget;

      const widgetTypeCollection: IWidgetType[] = [{ id: 'f2df0c3c-5dc3-49f0-843f-d8a8edf0fe4e' }];
      jest.spyOn(widgetTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: widgetTypeCollection })));
      const additionalWidgetTypes = [widget];
      const expectedCollection: IWidgetType[] = [...additionalWidgetTypes, ...widgetTypeCollection];
      jest.spyOn(widgetTypeService, 'addWidgetTypeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ widget });
      comp.ngOnInit();

      expect(widgetTypeService.query).toHaveBeenCalled();
      expect(widgetTypeService.addWidgetTypeToCollectionIfMissing).toHaveBeenCalledWith(
        widgetTypeCollection,
        ...additionalWidgetTypes.map(expect.objectContaining)
      );
      expect(comp.widgetTypesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const widget: IWidget = { id: 'CBA' };
      const widget: IWidgetType = { id: '5e8d2ab7-9cd9-4f03-a6da-85df53d4b8cd' };
      widget.widget = widget;

      activatedRoute.data = of({ widget });
      comp.ngOnInit();

      expect(comp.widgetTypesSharedCollection).toContain(widget);
      expect(comp.widget).toEqual(widget);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWidget>>();
      const widget = { id: 'ABC' };
      jest.spyOn(widgetFormService, 'getWidget').mockReturnValue(widget);
      jest.spyOn(widgetService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ widget });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: widget }));
      saveSubject.complete();

      // THEN
      expect(widgetFormService.getWidget).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(widgetService.update).toHaveBeenCalledWith(expect.objectContaining(widget));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWidget>>();
      const widget = { id: 'ABC' };
      jest.spyOn(widgetFormService, 'getWidget').mockReturnValue({ id: null });
      jest.spyOn(widgetService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ widget: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: widget }));
      saveSubject.complete();

      // THEN
      expect(widgetFormService.getWidget).toHaveBeenCalled();
      expect(widgetService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWidget>>();
      const widget = { id: 'ABC' };
      jest.spyOn(widgetService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ widget });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(widgetService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareWidgetType', () => {
      it('Should forward to widgetTypeService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(widgetTypeService, 'compareWidgetType');
        comp.compareWidgetType(entity, entity2);
        expect(widgetTypeService.compareWidgetType).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
