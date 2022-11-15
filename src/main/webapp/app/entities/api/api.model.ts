import { IApiBannette } from 'app/entities/api-bannette/api-bannette.model';

export interface IApi {
  id: string;
  api?: Pick<IApiBannette, 'id'> | null;
}

export type NewApi = Omit<IApi, 'id'> & { id: null };
