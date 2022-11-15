import { IDashboardItem, NewDashboardItem } from './dashboard-item.model';

export const sampleWithRequiredData: IDashboardItem = {
  id: '6e9ae97c-4208-45ae-b0a1-2c0c5b9e51c5',
};

export const sampleWithPartialData: IDashboardItem = {
  id: '78de9e92-1206-485f-85a5-2c63abd0903a',
};

export const sampleWithFullData: IDashboardItem = {
  id: '31433e79-b3de-4ebb-b142-2540d05b8a73',
  x: 42471,
  y: 76982,
  rows: 18073,
  col: 39760,
};

export const sampleWithNewData: NewDashboardItem = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
