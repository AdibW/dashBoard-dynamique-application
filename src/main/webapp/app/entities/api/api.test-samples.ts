import { IApi, NewApi } from './api.model';

export const sampleWithRequiredData: IApi = {
  id: '9a971edf-999a-45a2-aa36-3e6071be45d2',
};

export const sampleWithPartialData: IApi = {
  id: '9a805ffd-238a-4345-b047-03fa23385bb1',
};

export const sampleWithFullData: IApi = {
  id: 'a59a603e-cc12-40bc-9251-c75e10d29f6b',
};

export const sampleWithNewData: NewApi = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
