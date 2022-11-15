import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWidgetType } from '../widget-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../widget-type.test-samples';

import { WidgetTypeService } from './widget-type.service';

const requireRestSample: IWidgetType = {
  ...sampleWithRequiredData,
};

describe('WidgetType Service', () => {
  let service: WidgetTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IWidgetType | IWidgetType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WidgetTypeService);
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

    it('should create a WidgetType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const widgetType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(widgetType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WidgetType', () => {
      const widgetType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(widgetType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WidgetType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WidgetType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WidgetType', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWidgetTypeToCollectionIfMissing', () => {
      it('should add a WidgetType to an empty array', () => {
        const widgetType: IWidgetType = sampleWithRequiredData;
        expectedResult = service.addWidgetTypeToCollectionIfMissing([], widgetType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(widgetType);
      });

      it('should not add a WidgetType to an array that contains it', () => {
        const widgetType: IWidgetType = sampleWithRequiredData;
        const widgetTypeCollection: IWidgetType[] = [
          {
            ...widgetType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWidgetTypeToCollectionIfMissing(widgetTypeCollection, widgetType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WidgetType to an array that doesn't contain it", () => {
        const widgetType: IWidgetType = sampleWithRequiredData;
        const widgetTypeCollection: IWidgetType[] = [sampleWithPartialData];
        expectedResult = service.addWidgetTypeToCollectionIfMissing(widgetTypeCollection, widgetType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(widgetType);
      });

      it('should add only unique WidgetType to an array', () => {
        const widgetTypeArray: IWidgetType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const widgetTypeCollection: IWidgetType[] = [sampleWithRequiredData];
        expectedResult = service.addWidgetTypeToCollectionIfMissing(widgetTypeCollection, ...widgetTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const widgetType: IWidgetType = sampleWithRequiredData;
        const widgetType2: IWidgetType = sampleWithPartialData;
        expectedResult = service.addWidgetTypeToCollectionIfMissing([], widgetType, widgetType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(widgetType);
        expect(expectedResult).toContain(widgetType2);
      });

      it('should accept null and undefined values', () => {
        const widgetType: IWidgetType = sampleWithRequiredData;
        expectedResult = service.addWidgetTypeToCollectionIfMissing([], null, widgetType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(widgetType);
      });

      it('should return initial array if no WidgetType is added', () => {
        const widgetTypeCollection: IWidgetType[] = [sampleWithRequiredData];
        expectedResult = service.addWidgetTypeToCollectionIfMissing(widgetTypeCollection, undefined, null);
        expect(expectedResult).toEqual(widgetTypeCollection);
      });
    });

    describe('compareWidgetType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWidgetType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareWidgetType(entity1, entity2);
        const compareResult2 = service.compareWidgetType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareWidgetType(entity1, entity2);
        const compareResult2 = service.compareWidgetType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareWidgetType(entity1, entity2);
        const compareResult2 = service.compareWidgetType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
