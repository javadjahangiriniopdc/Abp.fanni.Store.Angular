import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Store',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44384',
    redirectUri: baseUrl,
    clientId: 'Store_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone Store',
  },
  apis: {
    default: {
      url: 'https://localhost:44384',
      rootNamespace: 'fanni.Store',
    },
  },
} as Environment;
