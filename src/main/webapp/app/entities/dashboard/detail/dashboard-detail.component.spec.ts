import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DashboardDetailComponent } from './dashboard-detail.component';

describe('Dashboard Management Detail Component', () => {
  let comp: DashboardDetailComponent;
  let fixture: ComponentFixture<DashboardDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ dashboard: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(DashboardDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DashboardDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dashboard on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.dashboard).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
