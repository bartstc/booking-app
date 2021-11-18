import { IAddress } from "modules/facility/application";

export interface IMember {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  birthday: string | null;
  address: IAddress | null;
}
