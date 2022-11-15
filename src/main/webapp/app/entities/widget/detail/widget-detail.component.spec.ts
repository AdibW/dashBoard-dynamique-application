import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WidgetDetailComponent } from './widget-detail.component';

describe('Widget Management Detail Component', () => {
  let comp: WidgetDetailComponent;
  let fixture: ComponentFixture<WidgetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ widget: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(WidgetDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(WidgetDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load widget on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.widget).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
