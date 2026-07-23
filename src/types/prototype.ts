export interface Prototype {
  id: number;
  title: string;
  catchphrase: string;
  concept: string;
  imageUrl?: string;
  userId?: number;
  user?: {
    name: string;
  };
  createdAt?: string;
}

export interface CreatePrototypeInput {
  title: string;
  catchphrase: string;
  concept: string;
  image?: File | null;
}
