import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';

import { environment } from './environments/environment';
import keycloak from './keycloak/keycloak.config';

if (environment.enableAuth) {
  keycloak
    .init({
      onLoad: 'login-required', // or 'check-sso' depending on requirements, usually login-required for internal apps
      checkLoginIframe: false
    })
    .then((authenticated) => {
      if (authenticated) {
        console.log('Authenticated with Keycloak');
        bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
      } else {
        console.error('Authentication failed');
        // Depending on flow, might not reach here if onLoad is login-required and it redirects
      }
    })
    .catch((err) => {
      console.error('Keycloak initialization failed', err);
    });
} else {
  console.log('Authentication disabled');
  bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
}
