import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ApiFormService } from './api-form.service';
import { ApiService } from '../service/api.service';
import { IApi } from '../api.model';
import { IApiBannette } from 'app/entities/api-bannette/api-bannette.model';
import { ApiBannetteService } from 'app/entities/api-bannette/service/api-bannette.service';

import { ApiUpdateComponent } from './api-update.component';

describe('Api Management Update Component', () => {
  let comp: ApiUpdateComponent;
  let fixture: ComponentFixture<ApiUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let apiFormService: ApiFormService;
  let apiService: ApiService;
  let apiBannetteService: ApiBannetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ApiUpdateComponent],
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
      .overrideTemplate(ApiUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ApiUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    apiFormService = TestBed.inject(ApiFormService);
    apiService = TestBed.inject(ApiService);
    apiBannetteService = TestBed.inject(ApiBannetteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ApiBannette query and add missing value', () => {
      const api: IApi = { id: 'CBA' };
      const api: IApiBannette = { id: 'fc69ef5f-b775-4953-af78-66c0fbe6f0a2' };
      api.api = api;

      const apiBannetteCollection: IApiBannette[] = [{ id: '1bf883e4-d649-4c30-b1c9-3f803db82050' }];
      jest.spyOn(apiBannetteService, 'query').mockReturnValue(of(new HttpResponse({ body: apiBannetteCollection })));
      const additionalApiBannettes = [api];
      const expectedCollection: IApiBannette[] = [...additionalApiBannettes, ...apiBannetteCollection];
      jest.spyOn(apiBannetteService, 'addApiBannetteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ api });
      comp.ngOnInit();

      expect(apiBannetteService.query).toHaveBeenCalled();
      expect(apiBannetteService.addApiBannetteToCollectionIfMissing).toHaveBeenCalledWith(
        apiBannetteCollection,
        ...additionalApiBannettes.map(expect.objectContaining)
      );
      expect(comp.apiBannettesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const api: IApi = { id: 'CBA' };
      const api: IApiBannette = { id: 'b4f7beda-691e-4613-92bd-88e192e95b68' };
      api.api = api;

      activatedRoute.data = of({ api });
      comp.ngOnInit();

      expect(comp.apiBannettesSharedCollection).toContain(api);
      expect(comp.api).toEqual(api);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApi>>();
      const api = { id: 'ABC' };
      jest.spyOn(apiFormService, 'getApi').mockReturnValue(api);
      jest.spyOn(apiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ api });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: api }));
      saveSubject.complete();

      // THEN
      expect(apiFormService.getApi).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(apiService.update).toHaveBeenCalledWith(expect.objectContaining(api));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApi>>();
      const api = { id: 'ABC' };
      jest.spyOn(apiFormService, 'getApi').mockReturnValue({ id: null });
      jest.spyOn(apiService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ api: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: api }));
      saveSubject.complete();

      // THEN
      expect(apiFormService.getApi).toHaveBeenCalled();
      expect(apiService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApi>>();
      const api = { id: 'ABC' };
      jest.spyOn(apiService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ api });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(apiService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareApiBannette', () => {
      it('Should forward to apiBannetteService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(apiBannetteService, 'compareApiBannette');
        comp.compareApiBannette(entity, entity2);
        expect(apiBannetteService.compareApiBannette).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
