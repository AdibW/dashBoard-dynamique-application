import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IApiBannette } from '../api-bannette.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../api-bannette.test-samples';

import { ApiBannetteService } from './api-bannette.service';

const requireRestSample: IApiBannette = {
  ...sampleWithRequiredData,
};

describe('ApiBannette Service', () => {
  let service: ApiBannetteService;
  let httpMock: HttpTestingController;
  let expectedResult: IApiBannette | IApiBannette[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ApiBannetteService);
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

    it('should create a ApiBannette', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const apiBannette = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(apiBannette).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ApiBannette', () => {
      const apiBannette = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(apiBannette).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ApiBannette', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ApiBannette', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ApiBannette', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addApiBannetteToCollectionIfMissing', () => {
      it('should add a ApiBannette to an empty array', () => {
        const apiBannette: IApiBannette = sampleWithRequiredData;
        expectedResult = service.addApiBannetteToCollectionIfMissing([], apiBannette);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(apiBannette);
      });

      it('should not add a ApiBannette to an array that contains it', () => {
        const apiBannette: IApiBannette = sampleWithRequiredData;
        const apiBannetteCollection: IApiBannette[] = [
          {
            ...apiBannette,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addApiBannetteToCollectionIfMissing(apiBannetteCollection, apiBannette);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ApiBannette to an array that doesn't contain it", () => {
        const apiBannette: IApiBannette = sampleWithRequiredData;
        const apiBannetteCollection: IApiBannette[] = [sampleWithPartialData];
        expectedResult = service.addApiBannetteToCollectionIfMissing(apiBannetteCollection, apiBannette);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(apiBannette);
      });

      it('should add only unique ApiBannette to an array', () => {
        const apiBannetteArray: IApiBannette[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const apiBannetteCollection: IApiBannette[] = [sampleWithRequiredData];
        expectedResult = service.addApiBannetteToCollectionIfMissing(apiBannetteCollection, ...apiBannetteArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const apiBannette: IApiBannette = sampleWithRequiredData;
        const apiBannette2: IApiBannette = sampleWithPartialData;
        expectedResult = service.addApiBannetteToCollectionIfMissing([], apiBannette, apiBannette2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(apiBannette);
        expect(expectedResult).toContain(apiBannette2);
      });

      it('should accept null and undefined values', () => {
        const apiBannette: IApiBannette = sampleWithRequiredData;
        expectedResult = service.addApiBannetteToCollectionIfMissing([], null, apiBannette, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(apiBannette);
      });

      it('should return initial array if no ApiBannette is added', () => {
        const apiBannetteCollection: IApiBannette[] = [sampleWithRequiredData];
        expectedResult = service.addApiBannetteToCollectionIfMissing(apiBannetteCollection, undefined, null);
        expect(expectedResult).toEqual(apiBannetteCollection);
      });
    });

    describe('compareApiBannette', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareApiBannette(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareApiBannette(entity1, entity2);
        const compareResult2 = service.compareApiBannette(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareApiBannette(entity1, entity2);
        const compareResult2 = service.compareApiBannette(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareApiBannette(entity1, entity2);
        const compareResult2 = service.compareApiBannette(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
