import { IApiBannette, NewApiBannette } from './api-bannette.model';

export const sampleWithRequiredData: IApiBannette = {
  id: '4a71223a-4940-43dc-876a-f4a8491e42d3',
};

export const sampleWithPartialData: IApiBannette = {
  id: 'dd9c447c-a29d-4dd3-b82f-d7d3b3322407',
};

export const sampleWithFullData: IApiBannette = {
  id: '58150699-f9df-4a4b-a359-2b25e3cb7d5b',
  apiInitialLoad: 'interface deposit',
  apiSearch: 'Hat',
};

export const sampleWithNewData: NewApiBannette = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
