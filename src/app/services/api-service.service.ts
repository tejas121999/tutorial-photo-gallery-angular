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
  //tax
  getTaxList(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.GetTaxList, body, true);
  }

  addTax(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.AddTax, body, true);
  }

  // Supplier
  getSupplierList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetSupplierList,
      body,
      true
    );
  }

  addSupplierData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddSupplierData,
      body,
      true
    );
  }
  //  customer
  getCustomerList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetCustomerList,
      body,
      true
    );
  }

  // item
  getItemList(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.GetItemList, body, true);
  }

  addItemData(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.AddItemData, body, true);
  }

  // Ledger/GetSalesList
  getSalesList(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.GetSalesList, body, true);
  }

  // Ledger/GetPurchaseList
  getPurchaseList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetPurchaseList,
      body,
      true
    );
  }

  addPurchaseData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddPurchaseData,
      body,
      true
    );
  }

  getItemGroupList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetItemGroupList,
      body,
      true
    );
  }

  getItemCategoryList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetItemCategoryList,
      body,
      true
    );
  }

  getUnitSimpleList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetUnitSimpleList,
      body,
      true
    );
  }
}
