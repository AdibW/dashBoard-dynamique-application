import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDashboardItem } from '../dashboard-item.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../dashboard-item.test-samples';

import { DashboardItemService } from './dashboard-item.service';

const requireRestSample: IDashboardItem = {
  ...sampleWithRequiredData,
};

describe('DashboardItem Service', () => {
  let service: DashboardItemService;
  let httpMock: HttpTestingController;
  let expectedResult: IDashboardItem | IDashboardItem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DashboardItemService);
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

    it('should create a DashboardItem', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dashboardItem = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dashboardItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DashboardItem', () => {
      const dashboardItem = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dashboardItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DashboardItem', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DashboardItem', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DashboardItem', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDashboardItemToCollectionIfMissing', () => {
      it('should add a DashboardItem to an empty array', () => {
        const dashboardItem: IDashboardItem = sampleWithRequiredData;
        expectedResult = service.addDashboardItemToCollectionIfMissing([], dashboardItem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dashboardItem);
      });

      it('should not add a DashboardItem to an array that contains it', () => {
        const dashboardItem: IDashboardItem = sampleWithRequiredData;
        const dashboardItemCollection: IDashboardItem[] = [
          {
            ...dashboardItem,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDashboardItemToCollectionIfMissing(dashboardItemCollection, dashboardItem);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DashboardItem to an array that doesn't contain it", () => {
        const dashboardItem: IDashboardItem = sampleWithRequiredData;
        const dashboardItemCollection: IDashboardItem[] = [sampleWithPartialData];
        expectedResult = service.addDashboardItemToCollectionIfMissing(dashboardItemCollection, dashboardItem);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dashboardItem);
      });

      it('should add only unique DashboardItem to an array', () => {
        const dashboardItemArray: IDashboardItem[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dashboardItemCollection: IDashboardItem[] = [sampleWithRequiredData];
        expectedResult = service.addDashboardItemToCollectionIfMissing(dashboardItemCollection, ...dashboardItemArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dashboardItem: IDashboardItem = sampleWithRequiredData;
        const dashboardItem2: IDashboardItem = sampleWithPartialData;
        expectedResult = service.addDashboardItemToCollectionIfMissing([], dashboardItem, dashboardItem2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dashboardItem);
        expect(expectedResult).toContain(dashboardItem2);
      });

      it('should accept null and undefined values', () => {
        const dashboardItem: IDashboardItem = sampleWithRequiredData;
        expectedResult = service.addDashboardItemToCollectionIfMissing([], null, dashboardItem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dashboardItem);
      });

      it('should return initial array if no DashboardItem is added', () => {
        const dashboardItemCollection: IDashboardItem[] = [sampleWithRequiredData];
        expectedResult = service.addDashboardItemToCollectionIfMissing(dashboardItemCollection, undefined, null);
        expect(expectedResult).toEqual(dashboardItemCollection);
      });
    });

    describe('compareDashboardItem', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDashboardItem(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareDashboardItem(entity1, entity2);
        const compareResult2 = service.compareDashboardItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareDashboardItem(entity1, entity2);
        const compareResult2 = service.compareDashboardItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareDashboardItem(entity1, entity2);
        const compareResult2 = service.compareDashboardItem(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
