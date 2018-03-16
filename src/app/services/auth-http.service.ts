// /*
//  * Copyright (C) 2017 HAT Data Exchange Ltd - All Rights Reserved
//  * Unauthorized copying of this file, via any medium is strictly prohibited
//  * Proprietary and confidential
//  * Written by Augustinas Markevicius <augustinas.markevicius@hatdex.org> 2, 2017
//  */
//
// import { Injectable } from '@angular/core';
// import { Http, XHRBackend, Request, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { ReplaySubject } from 'rxjs/ReplaySubject';
//
// import { AppConfig } from '../app.config';
//
// declare var httpProtocol: string;
// const COOKIE_EXPIRATION_CHECK_OFFSET = 600; // in seconds
//
// @Injectable()
// export class AuthHttp extends Http {
//   private tokenName: string;
//   private hatBaseUrl: string;
//   private jwtHelper: JwtHelper = new JwtHelper();
//   private _auth$: ReplaySubject<boolean> = <ReplaySubject<boolean>>new ReplaySubject();
//
//   constructor(backend: XHRBackend, defaultOptions: RequestOptions,
//               private router: Router,
//
//               private config: AppConfig) {
//     super(backend, defaultOptions);
//
//     this.hatBaseUrl = `${httpProtocol || config.protocol}//${window.location.hostname}`;
//   }
//
//   request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
//     if (this.hasValidToken) {
//       return super.request(url, options)
//         .catch(error => {
//           if (error.status === 401) {
//             this.router.navigate(this.config.native ? ['user', 'login'] : ['user', 'login', 'start']);
//           }
//
//           return Observable.throw(error);
//         });
//     } else {
//       return Observable.throw('JWT does not exist');
//     }
//   }
//
// }
