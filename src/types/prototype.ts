export interface Prototype {
  userId: number;
  user: string;
  id: number;
  title: string;
  catchphrase: string;
  concept: string;
  imageUrl?: string;
  email?: string;
  name?: string;
  createdAt?: string;
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
