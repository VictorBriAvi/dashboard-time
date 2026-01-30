export interface ClientDTO {
  id: number;
  name: string;
  identityDocument: string | null;
  email: string | null;
  phone: string | null;
  parsedDateOfBirth: string | null;
}

export interface EditClientDTO {
  id: number;
  name: string;
  identityDocument: string | null;
  email: string | null;
  phone: string | null;
  dateBirth: string | null;
}
