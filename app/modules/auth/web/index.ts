export class WebAuth {
  private credentials: Array<Credential> = [];

  // Returns a Promise that resolves with a PublicKeyCredential object
  async createCredential(
    options: CredentialCreationOptions
  ): Promise<Credential> {
    try {
      // Use the WebAuthn API's `navigator.credentials.create()` method
      // to get a new credential for the device.
      const credential = await navigator.credentials.create(options);

      if (!credential) {
        throw new Error("No credential returned");
      }

      // Add the credential to our list of credentials
      this.credentials.push(credential);

      return credential;
    } catch (error) {
      // If an error occurs, return a rejected Promise
      return Promise.reject(error);
    }
  }

  // Adds a credential to the list of credentials
  addCredential(credential: PublicKeyCredential): void {
    this.credentials.push(credential);
  }

  // Removes a credential from the list of credentials
  removeCredential(credential: PublicKeyCredential): void {
    const index = this.credentials.indexOf(credential);
    if (index !== -1) {
      this.credentials.splice(index, 1);
    }
  }

  // Returns the list of credentials
  getCredentials(): Array<Credential> {
    return this.credentials;
  }

  // Returns a specific credential from the list of credentials
  getCredential(id: string): Credential | undefined {
    return this.credentials.find((credential) => credential.id === id);
  }
}
