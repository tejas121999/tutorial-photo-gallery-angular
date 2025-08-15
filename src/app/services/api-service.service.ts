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

  addCustomerData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddCustomerData,
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

  addSalesData(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.AddSalesData, body, true);
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

  addItemCategoryData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddItemCategoryData,
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

  addUnitSimpleData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddUnitSimpleData,
      body,
      true
    );
  }

  addItemGroupData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddItemGroupData,
      body,
      true
    );
  }

  getOtherExpenseList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetOtherExpenseList,
      body,
      true
    );
  }

  addOtherExpense(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddOtherExpense,
      body,
      true
    );
  }

  // round off
  getRoundOffLessList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetRoundOffLessList,
      body,
      true
    );
  }

  addRoundOffLess(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddRoundOffLess,
      body,
      true
    );
  }

  getRoundOffAddList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetRoundOffAddList,
      body,
      true
    );
  }

  addRoundOffAdd(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.AddRoundOffAdd, body, true);
  }

  getCostCenterList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetCostCenterList,
      body,
      true
    );
  }

  addCostCenterData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddCostCenterData,
      body,
      true
    );
  }

  // discount master
  addReceivedDiscount(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddReceivedDiscount,
      body,
      true
    );
  }

  getReceivedDiscountList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetReceivedDiscountList,
      body,
      true
    );
  }

  getPaidDiscountList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetPaidDiscountList,
      body,
      true
    );
  }

  addPaidDiscount(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddPaidDiscount,
      body,
      true
    );
  }

  getStoreList(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.GetStoreList, body, true);
  }

  addStoreData(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.AddStoreData, body, true);
  }

  // get voucher types
  getVoucherTypeList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetVoucherTypeList,
      body,
      true
    );
  }

  // voucher
  addVTSalesData(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.AddVTSalesData, body, true);
  }

  addVTPurchaseData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddVTPurchaseData,
      body,
      true
    );
  }

  addVTSalesOrderData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddVTSalesOrderData,
      body,
      true
    );
  }

  addVTPurchaseOrderData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddVTPurchaseOrderData,
      body,
      true
    );
  }

  addVTCreditNotData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddVTCreditNotData,
      body,
      true
    );
  }

  addVTDebitNotData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddVTDebitNotData,
      body,
      true
    );
  }

  addVTJournalData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddVTJournalData,
      body,
      true
    );
  }

  addVTDeliveryNoteData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddVTDeliveryNoteData,
      body,
      true
    );
  }

  addVTPaymentData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddVTPaymentData,
      body,
      true
    );
  }

  addVTReceiptData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddVTReceiptData,
      body,
      true
    );
  }

  // bank component
  getBankList(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.GetBankList, body, true);
  }

  addBankData(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.AddBankData, body, true);
  }

  // cash component
  getCashList(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.GetCashList, body, true);
  }

  addCashData(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.AddCashData, body, true);
  }

  // Transaction
  // Purchase
  getPurchaseVoucherList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetPurchaseVoucherList,
      body,
      true
    );
  }

  addPurchaseVoucherData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddPurchaseVoucherData,
      body,
      true
    );
  }

  // Sales
  getSalesVoucherList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetSalesVoucherList,
      body,
      true
    );
  }

  addSalesVoucherData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddSalesVoucherData,
      body,
      true
    );
  }

  // Purchase Order
  getPurchaseOrderVoucherList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetPurchaseOrderVoucherList,
      body,
      true
    );
  }

  addPurchaseOrderVoucherData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddPurchaseOrderVoucherData,
      body,
      true
    );
  }

  // Sales Order
  getSalesOrderVoucherList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetSalesOrderVoucherList,
      body,
      true
    );
  }

  addSalesOrderVoucherData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddSalesOrderVoucherData,
      body,
      true
    );
  }

  // Purchase Return
  getPurchaseReturnVoucherList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetDebitNoteVoucherList,
      body,
      true
    );
  }

  addPurchaseReturnVoucherData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddPurchaseReturnVoucherData,
      body,
      true
    );
  }

  // Sales Return
  getSalesReturnVoucherList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetCreditNotVoucherList,
      body,
      true
    );
  }

  addSalesReturnVoucherData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddSalesReturnVoucherData,
      body,
      true
    );
  }

  // Get Journal
  getJournalVoucherList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetJournalVoucherList,
      body,
      true
    );
  }

  addJournalVoucherData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddJournalVoucherData,
      body,
      true
    );
  }

  // Delivery Note
  getDeliveryNoteVoucherList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetDeliveryNoteVoucherList,
      body,
      true
    );
  }

  addDeliveryNoteVoucherData(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.AddDeliveryNoteVoucherData,
      body,
      true
    );
  }

  // Payment
  getPaymentVoucherList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetPaymentVoucherList,
      body,
      true
    );
  }

  addPaymentVoucherData(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.AddPaymentData, body, true);
  }

  // Receipt
  getReceiptVoucherList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetReceiptVoucherList,
      body,
      true
    );
  }

  addReceiptVoucherData(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.AddReceiptData, body, true);
  }

  getVoucherTypePurchaseList(body: any) {
    return this.apiManager.sendPOSTRequest(
      RestEnds.GetVoucherTypePurchaseList,
      body,
      true
    );
  }

  getLedgerList(body: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.GetLedgerList, body, true);
  }
}
