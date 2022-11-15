import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ApiBannetteService } from '../service/api-bannette.service';

import { ApiBannetteComponent } from './api-bannette.component';

describe('ApiBannette Management Component', () => {
  let comp: ApiBannetteComponent;
  let fixture: ComponentFixture<ApiBannetteComponent>;
  let service: ApiBannetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'api-bannette', component: ApiBannetteComponent }]), HttpClientTestingModule],
      declarations: [ApiBannetteComponent],
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
      .overrideTemplate(ApiBannetteComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ApiBannetteComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ApiBannetteService);

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
    expect(comp.apiBannettes?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to apiBannetteService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getApiBannetteIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getApiBannetteIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
