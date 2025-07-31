import { EventEmitter, Inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { AppPreference } from "./app-preference";
import { Router } from "@angular/router";
import { RestEnds, CustomEvents } from "./config";
import { catchError, tap, map } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiManager {
  responseEmitter: EventEmitter<any> = new EventEmitter();
  constructor(
    public http: HttpClient,
    public appPreference: AppPreference,
    public router: Router
  ) {}

  // Additional methods to handle API requests can be added here

  prepareUrl(url: RestEnds) {
    let urlStr = url + "";
    if (urlStr.indexOf("http://") != -1 || urlStr.indexOf("https://") != -1) {
      return urlStr;
    } else {
      return environment.apiBase + urlStr;
    }
  }

  getRequestHeaders(authenticate: boolean, endUrl: any) {
    var headers: any = {
      Accept: "application/json",
    };
    if (authenticate) {
      headers["Authorization"] =
        "Bearer " + localStorage.getItem("ACCESS_TOKEN") || "";
    }
    console.log("Headers: ", headers);
    return {
      headers: new HttpHeaders(headers),
    };
  }

  sendPOSTRequest(endUrl: RestEnds, bodyParams: any, authenticate: boolean) {
    console.log(authenticate);
    const headers = this.getRequestHeaders(authenticate, endUrl);
    var restUrl = this.prepareUrl(endUrl);
    const self = this;
    return self.http.post(restUrl, bodyParams, headers).pipe(
      map((response) => {
        // response = AppUtil.convertObject(response, "Camel");
        return response;
      }),
      tap({
        next: (event) => {},
        error: (error) => {
          self.processError(error);
        },
      }),
      catchError(self.handleError)
    );
  }

  sendGETRequest(endUrl: RestEnds, authenticate: boolean, params?: any) {
    const headers = this.getRequestHeaders(authenticate, endUrl);
    let restUrl = this.prepareUrl(endUrl);
    const options = { ...headers };
    if (params) {
      options["params"] = params;
    }
    const self = this;
    return self.http.get(restUrl, options).pipe(
      map((response) => {
        return response;
      }),
      tap({
        next: (event) => {},
        error: (error) => {
          self.processError(error);
        },
      }),
      catchError(self.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    const self = this;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${error.status}, ` +
          `body was: ${error.error}` +
          `, URL: ${error.url}`
      );
    }
    console.log(error);
    return throwError(() => error);
  }

  processError(error: any) {
    if (error.status == 401) {
      this.appPreference.clear();
      this.router.navigate(["/"]);
      this.responseEmitter.emit({ event: CustomEvents.UNAUTHORIZED });
    }
  }
}
