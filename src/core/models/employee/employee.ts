export interface Employee {
  id: number;
  name: string;
  identityDocument: string;
  paymentPercentage: number;
  employeeDateBirth: string;
  dateBirth: string;

}

export interface CreateEmployee{
  name: string;
  identityDocument: string;
  paymentPercentage: number;
  dateBirth: string;
}

export interface EditEmployee {
  id: number;
  name: string;
  identityDocument: string;
  paymentPercentage: number;
  dateBirth: string;
}

