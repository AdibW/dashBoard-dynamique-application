import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DataSourceService } from '../service/data-source.service';

import { DataSourceComponent } from './data-source.component';

describe('DataSource Management Component', () => {
  let comp: DataSourceComponent;
  let fixture: ComponentFixture<DataSourceComponent>;
  let service: DataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'data-source', component: DataSourceComponent }]), HttpClientTestingModule],
      declarations: [DataSourceComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(DataSourceComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DataSourceComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DataSourceService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 'ABC' }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.dataSources?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to dataSourceService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getDataSourceIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDataSourceIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
