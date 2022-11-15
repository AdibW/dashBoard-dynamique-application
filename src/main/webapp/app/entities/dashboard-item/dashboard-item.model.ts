import { IWidget } from 'app/entities/widget/widget.model';
import { IDashboard } from 'app/entities/dashboard/dashboard.model';

export interface IDashboardItem {
  id: string;
  x?: number | null;
  y?: number | null;
  rows?: number | null;
  col?: number | null;
  item?: Pick<IWidget, 'id'> | null;
  items?: Pick<IDashboard, 'id'> | null;
}

export type NewDashboardItem = Omit<IDashboardItem, 'id'> & { id: null };
