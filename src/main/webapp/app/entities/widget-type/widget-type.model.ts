import { IDataSource } from 'app/entities/data-source/data-source.model';

export interface IWidgetType {
  id: string;
  name?: string | null;
  widgetType?: Pick<IDataSource, 'id'> | null;
}

export type NewWidgetType = Omit<IWidgetType, 'id'> & { id: null };
