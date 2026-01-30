export interface Client {
  id: number;
  name: string;
  identityDocument?: string | null;
  email?: string | null;
  phone?: string | null;
  dateBirth?: string | null; // ISO
}

export interface CreateClient {
  name: string;                 // obligatorio
  identityDocument: string | null;
  email: string | null;
  phone: string | null;
  dateBirth: string | null;
}



export interface EditClient {
  id: number;
  name: string;
  identityDocument: string;
  email: string;
  phone: string;
  dateBirth: string;
}

