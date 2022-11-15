export interface IApiBannette {
  id: string;
  apiInitialLoad?: string | null;
  apiSearch?: string | null;
}

export type NewApiBannette = Omit<IApiBannette, 'id'> & { id: null };
