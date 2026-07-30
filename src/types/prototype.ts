export interface Prototype {
  id: number;
  title: string;
  catchCopy: string;
  concept: string;
  image?: string;
  userId?: number;
  name?: string;
}

export interface CreatePrototypeInput {
  title: string;
  catchphrase: string;
  concept: string;
  image?: File | null;
}

export interface UpdatePrototypeInput {
  title: string;
  catchCopy: string;
  concept: string;
  image?: File | null;
}
