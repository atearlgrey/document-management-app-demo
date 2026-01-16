declare global {
  interface Window {
    env: {
      production?: string;
      environment?: string;
      enableAuth?: string;
      authorityUrl?: string;
      authorityRealm?: string;
      authorityClientId?: string;
      serviceUrl?: string;
    };
  }
}

export { };
