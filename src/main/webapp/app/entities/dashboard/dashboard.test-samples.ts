import { IDashboard, NewDashboard } from './dashboard.model';

export const sampleWithRequiredData: IDashboard = {
  id: '357a9256-3702-4340-b823-0322a14ba456',
};

export const sampleWithPartialData: IDashboard = {
  id: '70151b53-fe80-41b0-a412-f0cfbbce1fb1',
  username: 'Shoes',
};

export const sampleWithFullData: IDashboard = {
  id: 'f48dd990-5564-4142-b8fd-52922c9cfb91',
  name: 'Future-proofed',
  username: 'THX 24/365',
};

export const sampleWithNewData: NewDashboard = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
