import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { WidgetTypeService } from '../service/widget-type.service';

import { WidgetTypeComponent } from './widget-type.component';

describe('WidgetType Management Component', () => {
  let comp: WidgetTypeComponent;
  let fixture: ComponentFixture<WidgetTypeComponent>;
  let service: WidgetTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'widget-type', component: WidgetTypeComponent }]), HttpClientTestingModule],
      declarations: [WidgetTypeComponent],
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
      .overrideTemplate(WidgetTypeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WidgetTypeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(WidgetTypeService);

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
    expect(comp.widgetTypes?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to widgetTypeService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getWidgetTypeIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getWidgetTypeIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
