import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ApiBannetteFormService } from './api-bannette-form.service';
import { ApiBannetteService } from '../service/api-bannette.service';
import { IApiBannette } from '../api-bannette.model';

import { ApiBannetteUpdateComponent } from './api-bannette-update.component';

describe('ApiBannette Management Update Component', () => {
  let comp: ApiBannetteUpdateComponent;
  let fixture: ComponentFixture<ApiBannetteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let apiBannetteFormService: ApiBannetteFormService;
  let apiBannetteService: ApiBannetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ApiBannetteUpdateComponent],
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
      .overrideTemplate(ApiBannetteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ApiBannetteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    apiBannetteFormService = TestBed.inject(ApiBannetteFormService);
    apiBannetteService = TestBed.inject(ApiBannetteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const apiBannette: IApiBannette = { id: 'CBA' };

      activatedRoute.data = of({ apiBannette });
      comp.ngOnInit();

      expect(comp.apiBannette).toEqual(apiBannette);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApiBannette>>();
      const apiBannette = { id: 'ABC' };
      jest.spyOn(apiBannetteFormService, 'getApiBannette').mockReturnValue(apiBannette);
      jest.spyOn(apiBannetteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ apiBannette });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: apiBannette }));
      saveSubject.complete();

      // THEN
      expect(apiBannetteFormService.getApiBannette).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(apiBannetteService.update).toHaveBeenCalledWith(expect.objectContaining(apiBannette));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApiBannette>>();
      const apiBannette = { id: 'ABC' };
      jest.spyOn(apiBannetteFormService, 'getApiBannette').mockReturnValue({ id: null });
      jest.spyOn(apiBannetteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ apiBannette: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: apiBannette }));
      saveSubject.complete();

      // THEN
      expect(apiBannetteFormService.getApiBannette).toHaveBeenCalled();
      expect(apiBannetteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApiBannette>>();
      const apiBannette = { id: 'ABC' };
      jest.spyOn(apiBannetteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ apiBannette });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(apiBannetteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
