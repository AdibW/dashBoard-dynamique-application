import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WidgetTypeDetailComponent } from './widget-type-detail.component';

describe('WidgetType Management Detail Component', () => {
  let comp: WidgetTypeDetailComponent;
  let fixture: ComponentFixture<WidgetTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetTypeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ widgetType: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(WidgetTypeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(WidgetTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load widgetType on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.widgetType).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
