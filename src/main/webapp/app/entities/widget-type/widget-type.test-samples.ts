import { IWidgetType, NewWidgetType } from './widget-type.model';

export const sampleWithRequiredData: IWidgetType = {
  id: '78ca271a-fca1-47e0-9bc5-fa70fe0c9225',
};

export const sampleWithPartialData: IWidgetType = {
  id: '5ab9252a-4c8f-4c4c-aecb-486d6c3dd373',
};

export const sampleWithFullData: IWidgetType = {
  id: '187a71d9-e03e-4783-afc4-be4acaa15277',
  name: 'Trace Plaza red',
};

export const sampleWithNewData: NewWidgetType = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
