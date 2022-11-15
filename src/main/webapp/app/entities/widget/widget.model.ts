import { IWidgetType } from 'app/entities/widget-type/widget-type.model';

export interface IWidget {
  id: string;
  name?: string | null;
  title?: string | null;
  componentName?: string | null;
  componentType?: string | null;
  widget?: Pick<IWidgetType, 'id'> | null;
}

export type NewWidget = Omit<IWidget, 'id'> & { id: null };
