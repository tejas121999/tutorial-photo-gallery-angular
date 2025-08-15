export enum CustomEvents {
  UNAUTHORIZED,
}
export enum RestEnds {
  UserLogin = "UserLogin/OnUserLoginApp",
  GetTaxList = "Ledger/GetTaxList",
  AddTax = "Ledger/AddTax",
  GetSupplierList = "Ledger/GetSupplierList",
  AddSupplierData = "Ledger/AddSupplierData",
  GetCustomerList = "Ledger/GetCustomerList",
  AddCustomerData = "Ledger/AddCustomerData",
  GetItemList = "Item/GetItemList",
  AddItemData = "Item/AddItemData",
  GetSalesList = "Ledger/GetSalesList",
  AddSalesData = "Ledger/AddSalesData",
  GetPurchaseList = "Ledger/GetPurchaseList",
  AddPurchaseData = "Ledger/AddPurchaseData",
  GetItemGroupList = "ItemGroup/GetItemGroupList",
  GetItemCategoryList = "ItemCategory/GetItemCategoryList",
  AddItemCategoryData = "ItemCategory/AddItemCategoryData",
  GetUnitSimpleList = "Unit/GetUnitSimpleList",
  AddUnitSimpleData = "Unit/AddUnitSimpleData",
  AddItemGroupData = "ItemGroup/AddItemGroupData",
  GetOtherExpenseList = "Ledger/GetOtherExpenseList",
  AddOtherExpense = "Ledger/AddOtherExpense",
  // Round Off Less
  GetRoundOffLessList = "Ledger/GetRoundOffLessList",
  AddRoundOffLess = "Ledger/AddRoundOffLess",
  // Round Off Add
  GetRoundOffAddList = "Ledger/GetRoundOffAddList",
  AddRoundOffAdd = "Ledger/AddRoundOffAdd",
  // cost center
  GetCostCenterList = "CostCenter/GetCostCenterList",
  AddCostCenterData = "CostCenter/AddCostCenterData",

  AddReceivedDiscount = "Ledger/AddReceivedDiscount",
  GetReceivedDiscountList = "Ledger/GetReceivedDiscountList",
  GetPaidDiscountList = "Ledger/GetPaidDiscountList",
  AddPaidDiscount = "Ledger/AddPaidDiscount",
  GetStoreList = "Store/GetStoreList",
  AddStoreData = "Store/AddStoreData",
  // get voucher type list
  GetVoucherTypeList = "VoucherType/GetVoucherTypeList",
  // voucher
  AddVTSalesData = "VoucherType/AddVTSalesData",
  AddVTPurchaseData = "VoucherType/AddVTPurchaseData",
  AddVTSalesOrderData = "VoucherType/AddVTSalesOrderData",
  AddVTPurchaseOrderData = "VoucherType/AddVTPurchaseOrderData",
  AddVTCreditNotData = "VoucherType/AddVTCreditNotData",
  AddVTDebitNotData = "VoucherType/AddVTDebitNotData",
  AddVTJournalData = "VoucherType/AddVTJournalData",
  AddVTDeliveryNoteData = "VoucherType/AddVTDeliveryNoteData",
  AddVTPaymentData = "VoucherType/AddVTPaymentData",
  AddVTReceiptData = "VoucherType/AddVTReceiptData",

  // payment module
  // bank component
  GetBankList = "Ledger/GetBankList",
  AddBankData = "Ledger/AddBankData",

  // cash component
  GetCashList = "Ledger/GetCashList",
  AddCashData = "Ledger/AddCashData",

  // Transaction
  // Purchase
  GetPurchaseVoucherList = "Voucher/GetPurchaseVoucherList",
  AddPurchaseVoucherData = "Voucher/AddPurchaseVoucherData",
  // Sales
  GetSalesVoucherList = "Voucher/GetSalesVoucherList",
  AddSalesVoucherData = "Voucher/AddSalesVoucherData",
  // Purchase Order
  GetPurchaseOrderVoucherList = "Voucher/GetPurchaseOrderVoucherList",
  AddPurchaseOrderVoucherData = "Voucher/AddPurchaseOrderVoucherData",
  // Sales Order
  GetSalesOrderVoucherList = "Voucher/GetSalesOrderVoucherList",
  AddSalesOrderVoucherData = "Voucher/AddSalesOrderVoucherData",
  // Purchase Return
  GetDebitNoteVoucherList = "Voucher/GetDebitNoteVoucherList",
  AddPurchaseReturnVoucherData = "Voucher/AddPurchaseVoucherData",
  // Sales Return
  GetCreditNotVoucherList = "Voucher/GetCreditNotVoucherList",
  AddSalesReturnVoucherData = "Voucher/AddSalesVoucherData",
  // Get Journal
  GetJournalVoucherList = "Voucher/GetJournalVoucherList",
  AddJournalVoucherData = "Voucher/AddJournalVoucherData",
  // Delivery Note
  GetDeliveryNoteVoucherList = "Voucher/GetDeliveryNoteVoucherList",
  AddDeliveryNoteVoucherData = "Voucher/AddDeliveryNoteVoucherData",
  // Payment
  GetPaymentVoucherList = "Voucher/GetPaymentVoucherList",
  AddPaymentData = "Voucher/AddPaymentAndReceiptData",
  // Receipt
  GetReceiptVoucherList = "Voucher/GetReceiptVoucherList",
  AddReceiptData = "Voucher/AddPaymentAndReceiptData",

  GetVoucherTypePurchaseList = "VoucherType/GetVoucherTypePurchaseList",

  GetLedgerList = "Ledger/GetLedgerList",
}
