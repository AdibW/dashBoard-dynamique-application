import { IWidget, NewWidget } from './widget.model';

export const sampleWithRequiredData: IWidget = {
  id: '7172408b-8a0f-42a4-ac3c-96da61dd4e8c',
};

export const sampleWithPartialData: IWidget = {
  id: '166a6c28-a68d-4f18-a2ab-ad4a94470536',
  componentType: 'Facilitator Lead bypass',
};

export const sampleWithFullData: IWidget = {
  id: '3a612695-e6ad-4b62-83b7-4ea481ab1d74',
  name: 'Buckinghamshire Sausages AI',
  title: 'International',
  componentName: 'Mews pink Account',
  componentType: 'Automated Cambridgeshire navigate',
};

export const sampleWithNewData: NewWidget = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
