// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://kanaga.my:8443',
  merchantId:'754164580684682',
  secretKey:'33927-100',
  payUrl:'https://app.senangpay.my/payment/754164580684682',  //url+'/merchantId'
  logoURL:"assets/images/Amano_Logo_Final.jpg",
  Address1:"NO.66-G,JALAN JU 2,TAMAN JAYA UTAMA,TELOK PANGLIMA GARANG,42500",
  Address2:"TLK PANGLIMA GARANG SELANGOR",
  Email:"info@smamano.my"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
