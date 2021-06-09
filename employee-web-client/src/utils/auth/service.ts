import { Log, User, UserManager } from 'oidc-client';

export class AuthService {
  public userManager: UserManager;
  private domain: string = process.env.REACT_APP_AUTH0_DOMAIN!;
  private clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID!;
  private clientHost: string = process.env.REACT_APP_CLIENT_HOST!;

  constructor() {
    const settings = {
      authority: this.domain,
      client_id: this.clientId,
      redirect_uri: `${this.clientHost}/dashboard`,
      silent_redirect_uri: `${this.clientHost}dashboard`,
      // tslint:disable-next-line:object-literal-sort-keys
      post_logout_redirect_uri: `${this.clientHost}`,
      response_type: 'code',
      scope: 'gatewayapi',
    };
    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
