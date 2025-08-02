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
  GetItemList = "Item/GetItemList",
  AddItemData = "Item/AddItemData",
  GetSalesList = "Ledger/GetSalesList",
  GetPurchaseList = "Ledger/GetPurchaseList",
  AddPurchaseData = "Ledger/AddPurchaseData",
  GetItemGroupList = "ItemGroup/GetItemGroupList",
  GetItemCategoryList = "ItemCategory/GetItemCategoryList",
  GetUnitSimpleList = "Unit/GetUnitSimpleList",
  AddItemGroupData = "ItemGroup/AddItemGroupData",
  GetOtherExpenseList = "Ledger/GetOtherExpenseList",
  GetRoundOffLessList = "Ledger/GetRoundOffLessList",
  GetCostCenterList = "CostCenter/GetCostCenterList",
  AddCostCenterData = "CostCenter/AddCostCenterData",
}
