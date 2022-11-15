import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IApi } from '../api.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../api.test-samples';

import { ApiService } from './api.service';

const requireRestSample: IApi = {
  ...sampleWithRequiredData,
};

describe('Api Service', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let expectedResult: IApi | IApi[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ApiService);
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

    it('should create a Api', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const api = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(api).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Api', () => {
      const api = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(api).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Api', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Api', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Api', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addApiToCollectionIfMissing', () => {
      it('should add a Api to an empty array', () => {
        const api: IApi = sampleWithRequiredData;
        expectedResult = service.addApiToCollectionIfMissing([], api);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(api);
      });

      it('should not add a Api to an array that contains it', () => {
        const api: IApi = sampleWithRequiredData;
        const apiCollection: IApi[] = [
          {
            ...api,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addApiToCollectionIfMissing(apiCollection, api);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Api to an array that doesn't contain it", () => {
        const api: IApi = sampleWithRequiredData;
        const apiCollection: IApi[] = [sampleWithPartialData];
        expectedResult = service.addApiToCollectionIfMissing(apiCollection, api);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(api);
      });

      it('should add only unique Api to an array', () => {
        const apiArray: IApi[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const apiCollection: IApi[] = [sampleWithRequiredData];
        expectedResult = service.addApiToCollectionIfMissing(apiCollection, ...apiArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const api: IApi = sampleWithRequiredData;
        const api2: IApi = sampleWithPartialData;
        expectedResult = service.addApiToCollectionIfMissing([], api, api2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(api);
        expect(expectedResult).toContain(api2);
      });

      it('should accept null and undefined values', () => {
        const api: IApi = sampleWithRequiredData;
        expectedResult = service.addApiToCollectionIfMissing([], null, api, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(api);
      });

      it('should return initial array if no Api is added', () => {
        const apiCollection: IApi[] = [sampleWithRequiredData];
        expectedResult = service.addApiToCollectionIfMissing(apiCollection, undefined, null);
        expect(expectedResult).toEqual(apiCollection);
      });
    });

    describe('compareApi', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareApi(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareApi(entity1, entity2);
        const compareResult2 = service.compareApi(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareApi(entity1, entity2);
        const compareResult2 = service.compareApi(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareApi(entity1, entity2);
        const compareResult2 = service.compareApi(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
