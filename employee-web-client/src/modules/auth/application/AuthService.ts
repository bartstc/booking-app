import { Log, UserManager, WebStorageStateStore, UserManagerSettings } from 'oidc-client';
import { IUser } from './types/IUser';

class AuthService {
  public userManager: UserManager;
  private domain: string = process.env.REACT_APP_AUTH0_DOMAIN!;
  private clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID!;
  private clientSecret: string = process.env.REACT_APP_AUTH0_CLIENT_SECRET!;
  private clientHost: string = process.env.REACT_APP_CLIENT_HOST!;

  constructor() {
    const settings: UserManagerSettings = {
      authority: `${this.domain}/`,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: `${this.clientHost}/signin-callback.html`,
      silent_redirect_uri: `${this.clientHost}/signin-callback.html`,
      post_logout_redirect_uri: `${this.clientHost}/`,
      response_type: 'code',
      scope: 'contexttype facilityid openid gatewayapi accessibilityapi',
      monitorSession: false,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    };
    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  public signinRedirectCallback = async (): Promise<void> => {
    this.userManager.signinRedirectCallback().then(() => '');
  };

  public getUser = async (): Promise<IUser | null> => {
    const user = await this.userManager.getUser();

    if (!user) {
      return (await this.userManager.signinRedirectCallback()) as IUser;
    }

    return user as IUser;
  };

  public parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  public signinRedirect = () => {
    localStorage.setItem('redirectUri', window.location.pathname);
    this.userManager.signinRedirect({});
  };

  public isAuthenticated = () => {
    const oidcStorage = JSON.parse(window.sessionStorage.getItem(`oidc.user:${this.domain}:${this.clientId}`)!);

    return !!oidcStorage && !!oidcStorage.access_token;
  };

  public signinSilent = () => {
    this.userManager
      .signinSilent()
      .then(user => {
        console.log('signed in', user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  public signinSilentCallback = () => {
    this.userManager.signinSilentCallback();
  };

  public createSigninRequest = () => {
    return this.userManager.createSigninRequest();
  };

  public logout = () => {
    this.userManager.signoutRedirect({
      id_token_hint: localStorage.getItem('id_token'),
    });
    this.userManager.clearStaleState();
  };

  public signoutRedirectCallback = () => {
    this.userManager.signoutRedirectCallback().then(() => {
      localStorage.clear();
      window.location.replace('/');
    });
    this.userManager.clearStaleState();
  };
}

export const authService = new AuthService();
