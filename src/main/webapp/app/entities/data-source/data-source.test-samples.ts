import { IDataSource, NewDataSource } from './data-source.model';

export const sampleWithRequiredData: IDataSource = {
  id: 'ce3d5eed-e407-4df4-96a7-e07c74c4f2ed',
};

export const sampleWithPartialData: IDataSource = {
  id: '56c97380-2767-47cf-96da-858fa209c267',
};

export const sampleWithFullData: IDataSource = {
  id: '7d18fcac-4770-4cae-9298-c1430644cc2c',
  type: 'Front-line',
};

export const sampleWithNewData: NewDataSource = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
