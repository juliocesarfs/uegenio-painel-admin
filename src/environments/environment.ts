// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The lista of file replacements can be found in `angular.json`.

require('dotenv').config();

export const environment = {
  production: false,
  urlApi: process.env.urlApi
};
