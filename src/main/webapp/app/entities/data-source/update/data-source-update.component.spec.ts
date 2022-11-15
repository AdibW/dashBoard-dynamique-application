import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DataSourceFormService } from './data-source-form.service';
import { DataSourceService } from '../service/data-source.service';
import { IDataSource } from '../data-source.model';
import { IApi } from 'app/entities/api/api.model';
import { ApiService } from 'app/entities/api/service/api.service';

import { DataSourceUpdateComponent } from './data-source-update.component';

describe('DataSource Management Update Component', () => {
  let comp: DataSourceUpdateComponent;
  let fixture: ComponentFixture<DataSourceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dataSourceFormService: DataSourceFormService;
  let dataSourceService: DataSourceService;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DataSourceUpdateComponent],
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
      .overrideTemplate(DataSourceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DataSourceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dataSourceFormService = TestBed.inject(DataSourceFormService);
    dataSourceService = TestBed.inject(DataSourceService);
    apiService = TestBed.inject(ApiService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Api query and add missing value', () => {
      const dataSource: IDataSource = { id: 'CBA' };
      const dataSource: IApi = { id: '03d83c90-e68e-4b9e-a888-69cfe8fcc112' };
      dataSource.dataSource = dataSource;

      const apiCollection: IApi[] = [{ id: '13f693c1-1377-44f6-9e53-cfa3250aea03' }];
      jest.spyOn(apiService, 'query').mockReturnValue(of(new HttpResponse({ body: apiCollection })));
      const additionalApis = [dataSource];
      const expectedCollection: IApi[] = [...additionalApis, ...apiCollection];
      jest.spyOn(apiService, 'addApiToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dataSource });
      comp.ngOnInit();

      expect(apiService.query).toHaveBeenCalled();
      expect(apiService.addApiToCollectionIfMissing).toHaveBeenCalledWith(apiCollection, ...additionalApis.map(expect.objectContaining));
      expect(comp.apisSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dataSource: IDataSource = { id: 'CBA' };
      const dataSource: IApi = { id: '70b901dc-9aea-4d53-831d-36fd010bd0f5' };
      dataSource.dataSource = dataSource;

      activatedRoute.data = of({ dataSource });
      comp.ngOnInit();

      expect(comp.apisSharedCollection).toContain(dataSource);
      expect(comp.dataSource).toEqual(dataSource);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDataSource>>();
      const dataSource = { id: 'ABC' };
      jest.spyOn(dataSourceFormService, 'getDataSource').mockReturnValue(dataSource);
      jest.spyOn(dataSourceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dataSource });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dataSource }));
      saveSubject.complete();

      // THEN
      expect(dataSourceFormService.getDataSource).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dataSourceService.update).toHaveBeenCalledWith(expect.objectContaining(dataSource));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDataSource>>();
      const dataSource = { id: 'ABC' };
      jest.spyOn(dataSourceFormService, 'getDataSource').mockReturnValue({ id: null });
      jest.spyOn(dataSourceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dataSource: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dataSource }));
      saveSubject.complete();

      // THEN
      expect(dataSourceFormService.getDataSource).toHaveBeenCalled();
      expect(dataSourceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDataSource>>();
      const dataSource = { id: 'ABC' };
      jest.spyOn(dataSourceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dataSource });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dataSourceService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareApi', () => {
      it('Should forward to apiService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(apiService, 'compareApi');
        comp.compareApi(entity, entity2);
        expect(apiService.compareApi).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
