import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApiBannetteDetailComponent } from './api-bannette-detail.component';

describe('ApiBannette Management Detail Component', () => {
  let comp: ApiBannetteDetailComponent;
  let fixture: ComponentFixture<ApiBannetteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiBannetteDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ apiBannette: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(ApiBannetteDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ApiBannetteDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load apiBannette on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.apiBannette).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
