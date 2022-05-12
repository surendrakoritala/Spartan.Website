// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  aadClientId: '3b007631-b43a-4087-8048-591ecd8b3fc6',
  tenantId: 'a1a2578a-8fd3-4595-bb18-7d17df8944b0',
  redirectUrl: 'http://localhost:4200/',
  apiUrl: 'https://localhost:44331/api/ClaimsTests',
  apiMlUrl: 'https://localhost:44331/api/MachineLearning',
  powerBI: {
    reportBaseURL: 'https://app.powerbi.com/reportEmbed',
    qnaBaseURL: 'https://app.powerbi.com/qnaEmbed',
    tileBaseURL: 'https://app.powerbi.com/embed',
    groupID: '',
    reportID: '',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
