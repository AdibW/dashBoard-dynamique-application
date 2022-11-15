import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApiDetailComponent } from './api-detail.component';

describe('Api Management Detail Component', () => {
  let comp: ApiDetailComponent;
  let fixture: ComponentFixture<ApiDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ api: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(ApiDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ApiDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load api on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.api).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
