export type Project = {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
  fullDescription: string;
  date: Date;
  hidden: boolean;
  customers: Customer[];
};

export type Customer = {
  id: string;
  name: string;
  imageUrl: string;
  contacts: string;
  projects: Project[];
};

export type User = {
  id: string;
  email: string;
  password: string;
};
