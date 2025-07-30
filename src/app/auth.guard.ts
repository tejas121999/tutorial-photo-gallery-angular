import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AppPreference } from "./shared/app-preference";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private appPreference: AppPreference, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.appPreference.isUserLoggedIn()) {
      return true;
    } else {
      return this.router.createUrlTree(["/login"], {
        queryParams: { returnUrl: state.url },
      });
    }
  }
}
