import { User, Profile } from 'oidc-client';

import { ContextType } from './ContextType';

export interface IUser extends User {
  profile: IUserProfile;
}

export interface IUserProfile extends Profile {
  contextType: ContextType;
}
