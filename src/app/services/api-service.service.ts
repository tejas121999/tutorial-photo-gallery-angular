import { Injectable } from "@angular/core";
import { RestEnds } from "../shared/config";
import { ApiManager } from "../shared/api-manager";

@Injectable({
  providedIn: "root",
})
export class ApiServiceService {
  constructor(
    private apiManager: ApiManager // Inject ApiManager
  ) {}
  // UserLogin
  userLogin(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.UserLogin, body, false);
  }

  getTaxList(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.GetTaxList, body, true);
  }
}
