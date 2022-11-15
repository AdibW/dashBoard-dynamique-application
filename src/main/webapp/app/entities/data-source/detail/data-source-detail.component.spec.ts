import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataSourceDetailComponent } from './data-source-detail.component';

describe('DataSource Management Detail Component', () => {
  let comp: DataSourceDetailComponent;
  let fixture: ComponentFixture<DataSourceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataSourceDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ dataSource: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(DataSourceDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DataSourceDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dataSource on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.dataSource).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
