export interface IAuthService {
  signup(email: string, password: string): Promise<void>;
}

export interface IAuthSignupResponse {
  _id: string;
  email_verified: boolean;
  email: string;
  username: string;
  given_name: string;
  family_name: string;
  name: string;
  nickname: string;
  picture: string;
}
