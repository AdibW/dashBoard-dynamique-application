import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DashboardItemDetailComponent } from './dashboard-item-detail.component';

describe('DashboardItem Management Detail Component', () => {
  let comp: DashboardItemDetailComponent;
  let fixture: ComponentFixture<DashboardItemDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardItemDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ dashboardItem: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(DashboardItemDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DashboardItemDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dashboardItem on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.dashboardItem).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
