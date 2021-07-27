/* eslint-disable no-console */
import { Log, UserManager, WebStorageStateStore, UserManagerSettings } from 'oidc-client';
import { IUser } from './types/IUser';

export class AuthService {
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
      redirect_uri: `${this.clientHost}/signin-oidc`,
      silent_redirect_uri: `${this.clientHost}/signin-oidc`,
      post_logout_redirect_uri: `${this.clientHost}/logout-callback`,
      response_type: 'code',
      response_mode: 'query',
      scope: 'openid email profile',
      monitorSession: false,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      metadata: {
        issuer: `${this.domain}/`,
        authorization_endpoint: `${this.domain}/authorize`,
        userinfo_endpoint: `${this.domain}/userinfo`,
        token_endpoint: `${this.domain}/oauth/token`,
        jwks_uri: `${this.domain}/.well-known/jwks.json`,
        end_session_endpoint: `${this.domain}/v2/logout?returnTo=${this.clientHost}/logout-callback&client_id=${this.clientId}`,
      },
    };
    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;

    this.userManager.events.addUserLoaded(() => {
      if (window.location.href.indexOf('signin-oidc') !== -1) {
        this.navigateToScreen();
      }
    });
    this.userManager.events.addSilentRenewError(e => {
      console.log('silent renew error', e.message);
    });

    this.userManager.events.addAccessTokenExpired(() => {
      console.log('token expired');
      this.logout();
    });
  }

  private navigateToScreen = () => {
    window.location.replace('/dashboard');
  };

  public signinRedirectCallback = async (): Promise<void> => {
    this.userManager.signinRedirectCallback().then(() => {
      window.location.replace('/');
    });
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

  public login = () => {
    localStorage.setItem('redirectUri', window.location.pathname);
    this.userManager.signinRedirect();
  };

  public isAuthenticated = () => {
    const oidcStorage = JSON.parse(window.localStorage.getItem(`oidc.user:${this.domain}/:${this.clientId}`)!);

    return !!oidcStorage && !!oidcStorage.access_token;
  };

  public signinSilent = () => {
    this.userManager
      .signinSilent()
      .then(user => {
        // eslint-disable-next-line no-console
        console.log('signed in', user);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
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
      localStorage.removeItem('redirectUri');
      localStorage.removeItem(`oidc.user:${this.domain}/:${this.clientId}`);
      window.location.replace('/');
    });
    this.userManager.clearStaleState();
  };
}

export const authService = new AuthService();
