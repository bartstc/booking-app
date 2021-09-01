export interface ISignUpMemberDto {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  birthDate?: string;
  address?: {
    city?: string;
    postCode?: string;
    street?: string;
  };
}
