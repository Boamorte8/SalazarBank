// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: 'DEV_20190921_V0.0.0.0_0457',
  url: {
    API_CLIENTS: 'https://testbankapi.firebaseio.com/clients.json'
  },
  GENERAL: {
    CONFIG: {
      TIMEOUT_REQUEST: 60000,
      DEFAULT_MAX_RETRIES: 0,
      DEFAULT_BACKOFF: 1000,
      DEFAULT_TIME_RETRY: 1000
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
