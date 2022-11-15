export interface IDashboard {
  id: string;
  name?: string | null;
  username?: string | null;
}

export type NewDashboard = Omit<IDashboard, 'id'> & { id: null };
