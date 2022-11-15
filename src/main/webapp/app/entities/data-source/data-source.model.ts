import { IApi } from 'app/entities/api/api.model';

export interface IDataSource {
  id: string;
  type?: string | null;
  dataSource?: Pick<IApi, 'id'> | null;
}

export type NewDataSource = Omit<IDataSource, 'id'> & { id: null };
