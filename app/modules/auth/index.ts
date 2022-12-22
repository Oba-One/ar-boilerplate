import { ZKAuth } from "./zk";
import { WebAuth } from './web';
import { CryptoAuth } from "./crypto";

export class Auth {
  zk?: ZKAuth;
  web?: WebAuth; 
  crypto?: CryptoAuth;

  constructor(private readonly auth: Auth) {}

  public async login(username: string): Promise<void> {
    // await this.auth.login(email, password);
  }

  public async logout(): Promise<void> {
    // await this.auth.logout();
  }
}
