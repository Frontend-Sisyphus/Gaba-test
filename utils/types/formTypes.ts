export interface CreateUserFormData {
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: "male" | "female";
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  role: "admin" | "moderator" | "user";
  
  address: string;
  city: string;
  state: string;
  postalCode: string;
  
  companyName: string;
  department: string;
  title: string;
}

export interface FormErrors {
  [key: string]: string;
}