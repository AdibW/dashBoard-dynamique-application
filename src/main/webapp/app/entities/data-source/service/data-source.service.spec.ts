import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDataSource } from '../data-source.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../data-source.test-samples';

import { DataSourceService } from './data-source.service';

const requireRestSample: IDataSource = {
  ...sampleWithRequiredData,
};

describe('DataSource Service', () => {
  let service: DataSourceService;
  let httpMock: HttpTestingController;
  let expectedResult: IDataSource | IDataSource[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DataSourceService);
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

    it('should create a DataSource', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dataSource = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dataSource).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DataSource', () => {
      const dataSource = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dataSource).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DataSource', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DataSource', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DataSource', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDataSourceToCollectionIfMissing', () => {
      it('should add a DataSource to an empty array', () => {
        const dataSource: IDataSource = sampleWithRequiredData;
        expectedResult = service.addDataSourceToCollectionIfMissing([], dataSource);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dataSource);
      });

      it('should not add a DataSource to an array that contains it', () => {
        const dataSource: IDataSource = sampleWithRequiredData;
        const dataSourceCollection: IDataSource[] = [
          {
            ...dataSource,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDataSourceToCollectionIfMissing(dataSourceCollection, dataSource);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DataSource to an array that doesn't contain it", () => {
        const dataSource: IDataSource = sampleWithRequiredData;
        const dataSourceCollection: IDataSource[] = [sampleWithPartialData];
        expectedResult = service.addDataSourceToCollectionIfMissing(dataSourceCollection, dataSource);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dataSource);
      });

      it('should add only unique DataSource to an array', () => {
        const dataSourceArray: IDataSource[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dataSourceCollection: IDataSource[] = [sampleWithRequiredData];
        expectedResult = service.addDataSourceToCollectionIfMissing(dataSourceCollection, ...dataSourceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dataSource: IDataSource = sampleWithRequiredData;
        const dataSource2: IDataSource = sampleWithPartialData;
        expectedResult = service.addDataSourceToCollectionIfMissing([], dataSource, dataSource2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dataSource);
        expect(expectedResult).toContain(dataSource2);
      });

      it('should accept null and undefined values', () => {
        const dataSource: IDataSource = sampleWithRequiredData;
        expectedResult = service.addDataSourceToCollectionIfMissing([], null, dataSource, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dataSource);
      });

      it('should return initial array if no DataSource is added', () => {
        const dataSourceCollection: IDataSource[] = [sampleWithRequiredData];
        expectedResult = service.addDataSourceToCollectionIfMissing(dataSourceCollection, undefined, null);
        expect(expectedResult).toEqual(dataSourceCollection);
      });
    });

    describe('compareDataSource', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDataSource(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareDataSource(entity1, entity2);
        const compareResult2 = service.compareDataSource(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareDataSource(entity1, entity2);
        const compareResult2 = service.compareDataSource(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareDataSource(entity1, entity2);
        const compareResult2 = service.compareDataSource(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
