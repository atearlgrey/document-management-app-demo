(function (window) {
  window['env'] = window['env'] || {};

  // Environment variables
  window['env']['production'] = '${PRODUCTION}';
  window['env']['environment'] = '${ENVIRONMENT}';
  window['env']['enableAuth'] = '${ENABLE_AUTH}';
  window['env']['authorityUrl'] = '${AUTHORITY_URL}';
  window['env']['authorityRealm'] = '${AUTHORITY_REALM}';
  window['env']['authorityClientId'] = '${AUTHORITY_CLIENT_ID}';
  window['env']['serviceUrl'] = '${SERVICE_URL}';
})(this);