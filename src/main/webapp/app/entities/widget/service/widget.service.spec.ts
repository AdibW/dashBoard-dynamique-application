import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWidget } from '../widget.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../widget.test-samples';

import { WidgetService } from './widget.service';

const requireRestSample: IWidget = {
  ...sampleWithRequiredData,
};

describe('Widget Service', () => {
  let service: WidgetService;
  let httpMock: HttpTestingController;
  let expectedResult: IWidget | IWidget[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WidgetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Widget', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const widget = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(widget).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Widget', () => {
      const widget = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(widget).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Widget', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Widget', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Widget', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWidgetToCollectionIfMissing', () => {
      it('should add a Widget to an empty array', () => {
        const widget: IWidget = sampleWithRequiredData;
        expectedResult = service.addWidgetToCollectionIfMissing([], widget);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(widget);
      });

      it('should not add a Widget to an array that contains it', () => {
        const widget: IWidget = sampleWithRequiredData;
        const widgetCollection: IWidget[] = [
          {
            ...widget,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWidgetToCollectionIfMissing(widgetCollection, widget);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Widget to an array that doesn't contain it", () => {
        const widget: IWidget = sampleWithRequiredData;
        const widgetCollection: IWidget[] = [sampleWithPartialData];
        expectedResult = service.addWidgetToCollectionIfMissing(widgetCollection, widget);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(widget);
      });

      it('should add only unique Widget to an array', () => {
        const widgetArray: IWidget[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const widgetCollection: IWidget[] = [sampleWithRequiredData];
        expectedResult = service.addWidgetToCollectionIfMissing(widgetCollection, ...widgetArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const widget: IWidget = sampleWithRequiredData;
        const widget2: IWidget = sampleWithPartialData;
        expectedResult = service.addWidgetToCollectionIfMissing([], widget, widget2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(widget);
        expect(expectedResult).toContain(widget2);
      });

      it('should accept null and undefined values', () => {
        const widget: IWidget = sampleWithRequiredData;
        expectedResult = service.addWidgetToCollectionIfMissing([], null, widget, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(widget);
      });

      it('should return initial array if no Widget is added', () => {
        const widgetCollection: IWidget[] = [sampleWithRequiredData];
        expectedResult = service.addWidgetToCollectionIfMissing(widgetCollection, undefined, null);
        expect(expectedResult).toEqual(widgetCollection);
      });
    });

    describe('compareWidget', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWidget(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareWidget(entity1, entity2);
        const compareResult2 = service.compareWidget(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareWidget(entity1, entity2);
        const compareResult2 = service.compareWidget(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareWidget(entity1, entity2);
        const compareResult2 = service.compareWidget(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
