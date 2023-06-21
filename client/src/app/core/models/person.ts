export interface AddressPerson {
  name: string;
  countrId: number;
  cityId: number;
  street: string;
}

export interface Person {
  id?: number;
  name: string;
  birthdate: string | Date;
  addresses: AddressPerson[];
}
