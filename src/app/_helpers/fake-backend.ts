import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered claims
const ClaimsKey = 'angular-11-crud-example-claims';
const ClaimsJSON = localStorage.getItem(ClaimsKey);
let claims: any[] = ClaimsJSON
  ? JSON.parse(ClaimsJSON)
  : [
      {
        BeneID: 1,
        ProviderID: 'PRV1234',
        InscClaimAmtReimbursed: 8000,
        EncounterType: 0,
        Gender: 2,
        Race: 1,
        IsRenalDiseaseIndicator: 0,
        IsAlzheimer: 2,
        IsHeartfailure: 2,
        IsKidneyDisease: 2,
        IsCancer: 2,
        IsObstrPulmonary: 2,
        IsDepression: 2,
        IsDiabetes: 1,
        IsIschemicHeart: 1,
        IsOsteoporasis: 1,
        Isrheumatoidarthritis: 2,
        Isstroke: 2,
        IPAnnualReimbursementAmt: 8000,
        IPAnnualDeductibleAmt: 1068,
        OPAnnualReimbursementAmt: 4240,
        OPAnnualDeductibleAmt: 730,
        Age: 94.0,
        IsDead: 0.0,
        DaysAdmitted: 8.0,
        TotalDiagnosis: 9.0,
        TotalProcedure: 2.0,
      },
    ];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/claims') && method === 'GET':
          return getClaims();
        case url.match(/\/claims\/\d+$/) && method === 'GET':
          return getClaimById();
        case url.endsWith('/claims') && method === 'POST':
          return createClaim();
        case url.match(/\/claims\/\d+$/) && method === 'PUT':
          return updateClaim();
        case url.match(/\/claims\/\d+$/) && method === 'DELETE':
          return deleteClaim();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getClaims() {
      return ok(claims.map((x) => basicDetails(x)));
    }

    function getClaimById() {
      const Claim = claims.find((x) => x.id === idFromUrl());
      return ok(basicDetails(Claim));
    }

    function createClaim() {
      const Claim = body;

      if (claims.find((x) => x.email === Claim.email)) {
        return error(`Claim with the email ${Claim.email} already exists`);
      }

      // assign Claim id and a few other properties then save
      Claim.id = newClaimId();
      delete Claim.confirmPassword;
      claims.push(Claim);
      localStorage.setItem(ClaimsKey, JSON.stringify(claims));

      return ok();
    }

    function updateClaim() {
      let params = body;
      let Claim = claims.find((x) => x.id === idFromUrl());

      if (
        params.email !== Claim.email &&
        claims.find((x) => x.email === params.email)
      ) {
        return error(`Claim with the email ${params.email} already exists`);
      }

      // only update password if entered
      if (!params.password) {
        delete params.password;
      }

      // update and save Claim
      Object.assign(Claim, params);
      localStorage.setItem(ClaimsKey, JSON.stringify(claims));

      return ok();
    }

    function deleteClaim() {
      claims = claims.filter((x) => x.id !== idFromUrl());
      localStorage.setItem(ClaimsKey, JSON.stringify(claims));
      return ok();
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
    }

    function error(message: any) {
      return throwError({ error: { message } }).pipe(
        materialize(),
        delay(500),
        dematerialize()
      ); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function basicDetails(Claim: any) {
      const { id, title, firstName, lastName, email, role } = Claim;
      return { id, title, firstName, lastName, email, role };
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function newClaimId() {
      return claims.length ? Math.max(...claims.map((x) => x.id)) + 1 : 1;
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
