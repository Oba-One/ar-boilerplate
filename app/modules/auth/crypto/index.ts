import * as ethers from "ethers";
import { SiweMessage } from "siwe";
import * as crypto from "crypto-js";

const domain = window.location.host;
const origin = window.location.origin;

export class CryptoAuth {
  private provider: ethers.providers.Web3Provider;
  private keys: string[] = [];
  private selectedIndex = 0;

  constructor(provider: ethers.providers.Web3Provider) {
    this.provider = provider;
  }

  // Connect to a wallet provider and retrieve the user's accounts
  public async connect(): Promise<void> {
    try {
      // Get the user's accounts from the provider
      this.keys = await this.provider.listAccounts();
    } catch (err) {
      throw new Error("Failed to connect to wallet provider: " + err);
    }
  }

  public createSiweMessage(address: string, statement: any) {
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
    });
    return message.prepareMessage();
  }

  public async signInWithEthereum() {
    const message = this.createSiweMessage(
      await this.provider.getSigner().getAddress(),
      "Sign in with Ethereum to the app."
    );
    console.log(await this.provider.getSigner().signMessage(message));
  }

  // Select a specific key to use when encrypting or decrypting messages
  public selectKey(index: number): void {
    if (index >= 0 && index < this.keys.length) {
      this.selectedIndex = index;
    } else {
      throw new Error("Invalid key index");
    }
  }

  // Encrypt a message using AES and a key derivation function
  public encryptMessage(message: string, password: string): string {
    // Use a key derivation function to generate a derived key from the password
    const derivedKey = crypto.PBKDF2(password, this.keys[this.selectedIndex], {
      keySize: 256 / 32,
    });
    // Encrypt the message using the derived key and multiple layers of encryption
    const encryptedMessage = crypto.AES.encrypt(
      crypto.AES.encrypt(message, derivedKey).toString(),
      this.keys[this.selectedIndex]
    ).toString();
    return encryptedMessage;
  }

  // Decrypt an encrypted message using AES and a key derivation function
  public decryptMessage(encryptedMessage: string, password: string): string {
    // Use a key derivation function to generate a derived key from the password
    const derivedKey = crypto.PBKDF2(password, this.keys[this.selectedIndex], {
      keySize: 256 / 32,
    });
    // Decrypt the message using the derived key and multiple layers of encryption
    const bytes = crypto.AES.decrypt(
      encryptedMessage,
      this.keys[this.selectedIndex]
    );
    const decryptedMessage = crypto.AES.decrypt(
      bytes.toString(crypto.enc.Utf8),
      derivedKey
    ).toString(crypto.enc.Utf8);
    return decryptedMessage;
  }

  // Hash a message using SHA256
  public hashMessage(message: string): string {
    return crypto.SHA256(message).toString();
  }
}
