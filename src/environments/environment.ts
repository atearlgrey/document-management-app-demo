export const environment = {
  production: window?.env?.production === 'true' ? true : false,
  environment: window?.env?.environment ?? 'development',
  enableAuth: window?.env?.enableAuth === 'true' ? true : false,
  authorityUrl: window?.env?.authorityUrl ?? 'http://localhost:8080',
  authorityRealm: window?.env?.authorityRealm ?? 'plant-growth',
  authorityClientId: window?.env?.authorityClientId ?? 'plant-growth-client',
  serviceUrl: window?.env?.serviceUrl ?? 'http://localhost:4301',
};
