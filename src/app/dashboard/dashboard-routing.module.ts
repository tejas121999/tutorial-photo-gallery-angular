import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./home/home.component";
import { TaxPage } from "./master/tax/tax.page";
import { TaxListComponent } from "./master/tax-list/tax-list.component";
import { SupplierComponent } from "./master/supplier/supplier.component";
import { SupplierListComponent } from "./master/supplier-list/supplier-list.component";
import { CustommerComponent } from "./master/custommer/custommer.component";
import { CustomerListComponent } from "./master/customer-list/customer-list.component";
import { SalesAccountComponent } from "./master/sales-account/sales-account.component";
import { SalesAccountListComponent } from "./master/sales-account-list/sales-account-list.component";
import { PurchaseAccountComponent } from "./master/purchase-account/purchase-account.component";
import { PurchaseAccountListComponent } from "./master/purchase-account-list/purchase-account-list.component";
import { StockItemComponent } from "./master/stock-item/stock-item.component";
import { StockItemListComponent } from "./master/stock-item-list/stock-item-list.component";
import { UnitComponent } from "./master/unit/unit.component";
import { UnitListComponent } from "./master/unit-list/unit-list.component";
import { VoucherTypeComponent } from "./master/voucher-type/voucher-type.component";
import { VoucherTypeListComponent } from "./master/voucher-type-list/voucher-type-list.component";
import { StockCategoryComponent } from "./master/stock-category/stock-category.component";
import { StockCategoryListComponent } from "./master/stock-category-list/stock-category-list.component";
import { StockGroupsComponent } from "./master/stock-groups/stock-groups.component";
import { StockGroupListComponent } from "./master/stock-group-list/stock-group-list.component";
import { DiscountComponent } from "./master/discount/discount.component";
import { DiscountListComponent } from "./master/discount-list/discount-list.component";
import { OtherChargesComponent } from "./master/other-charges/other-charges.component";
import { OtherChargesListComponent } from "./master/other-charges-list/other-charges-list.component";
import { RoundOffComponent } from "./master/round-off/round-off.component";
import { RoundOffListComponent } from "./master/round-off-list/round-off-list.component";
import { CostCenterComponent } from "./master/cost-center/cost-center.component";
import { CostCenterListComponent } from "./master/cost-center-list/cost-center-list.component";
import { GodownComponent } from "./master/godown/godown.component";
import { GodownListComponent } from "./master/godown-list/godown-list.component";
import { MiscellaneousComponent } from "./master/miscellaneous/miscellaneous.component";
import { MiscellaneousListComponent } from "./master/miscellaneous-list/miscellaneous-list.component";
import { SalesComponent } from "./sales/sales.component";
import { PurchaseComponent } from "./purchase/purchase.component";
import { DiscountPaidComponent } from "./master/discount-paid/discount-paid.component";
import { DiscountPaidListComponent } from "./master/discount-paid-list/discount-paid-list.component";
import { RoundOffAddComponent } from "./master/round-off-add/round-off-add.component";
import { RoundOffAddListComponent } from "./master/round-off-add-list/round-off-add-list.component";
import { MyCompaniesComponent } from "./my-companies/my-companies.component";
import { StockComponent } from "./stock/stock.component";
import { ReportComponent } from "./report/report.component";
import { AddEntryComponent } from "./add-entry/add-entry.component";
import { BankComponent } from "./payment/bank/bank.component";
import { CashComponent } from "./payment/cash/cash.component";
import { EFundComponent } from "./payment/e-fund/e-fund.component";
import { BankListComponent } from "./payment/bank-list/bank-list.component";
import { CashListComponent } from "./payment/cash-list/cash-list.component";
import { EFundListComponent } from "./payment/e-fund-list/e-fund-list.component";
import { DeliveryNoteComponent } from "./transaction/delivery-note/delivery-note.component";
import { DeliveryNoteListComponent } from "./transaction/delivery-note-list/delivery-note-list.component";
import { JournalComponent } from "./transaction/journal/journal.component";
import { JournalListComponent } from "./transaction/journal-list/journal-list.component";
import { PaymentComponent } from "./transaction/payment/payment.component";
import { PaymentListComponent } from "./transaction/payment-list/payment-list.component";
import { PurchaseComponent as TransactionPurchaseComponent } from "./transaction/purchase/purchase.component";
import { PurchaseListComponent } from "./transaction/purchase-list/purchase-list.component";
import { PurchaseOrderComponent } from "./transaction/purchase-order/purchase-order.component";
import { PurchaseOrderListComponent } from "./transaction/purchase-order-list/purchase-order-list.component";
import { PurchaseReturnComponent } from "./transaction/purchase-return/purchase-return.component";
import { PurchaseReturnListComponent } from "./transaction/purchase-return-list/purchase-return-list.component";
import { ReceiptComponent } from "./transaction/receipt/receipt.component";
import { ReceiptListComponent } from "./transaction/receipt-list/receipt-list.component";
import { SalesComponent as TransactionSalesComponent } from "./transaction/sales/sales.component";
import { SalesListComponent } from "./transaction/sales-list/sales-list.component";
import { SalesOrderComponent } from "./transaction/sales-order/sales-order.component";
import { SalesOrderListComponent } from "./transaction/sales-order-list/sales-order-list.component";
import { SalesReturnComponent } from "./transaction/sales-return/sales-return.component";
import { SalesReturnListComponent } from "./transaction/sales-return-list/sales-return-list.component";
import { AddItemsComponent } from "./transaction/add-items/add-items.component";
import { AddMoreLagersComponent } from "./transaction/add-more-lagers/add-more-lagers.component";
import { AddItemDeliveryNoteComponent } from "./transaction/add-item-delivery-note/add-item-delivery-note.component";
import { AddLedgersDeliveryNoteComponent } from "./transaction/add-ledgers-delivery-note/add-ledgers-delivery-note.component";
import { AddLedgersPaymentComponent } from "./transaction/add-ledgers-payment/add-ledgers-payment.component";
import { AddBillSandryDetailsComponent } from "./transaction/add-bill-sandry-details/add-bill-sandry-details.component";
import { ProfileComponent } from "./settings/profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";
import { SetPinComponent } from "./settings/set-pin/set-pin.component";
import { AboutUsComponent } from "./settings/about-us/about-us.component";
import { HelpAndSupportComponent } from "./settings/help-and-support/help-and-support.component";
import { TermsOfUseComponent } from "./settings/terms-of-use/terms-of-use.component";
import { PrivacyPolicyComponent } from "./settings/privacy-policy/privacy-policy.component";
import { ThemesComponent } from "./settings/themes/themes.component";
import { DeleteAccountComponent } from "./settings/delete-account/delete-account.component";
import { CurrencyFormatComponent } from "./settings/currency-format/currency-format.component";
import { PaymentReminderComponent } from "./settings/payment-reminder/payment-reminder.component";
import { ProComponent } from "./settings/pro/pro.component";
import { ConnectToTallyComponent } from "./settings/connect-to-tally/connect-to-tally.component";

const routes: Routes = [
  {
    path: "rate-us",
    loadChildren: () =>
      import("./rate-us/rate-us.module").then((m) => m.RateUsModule),
  },
  {
    path: "configuration",
    loadChildren: () =>
      import("./configuration/configuration.module").then(
        (m) => m.ConfigurationModule
      ),
  },
  { path: "settings", component: SettingsComponent },
  { path: "settings/connect-to-tally", component: ConnectToTallyComponent },
  { path: "settings/pro", component: ProComponent },
  { path: "settings/payment-reminder", component: PaymentReminderComponent },
  { path: "settings/currency-format", component: CurrencyFormatComponent },
  { path: "settings/delete-account", component: DeleteAccountComponent },
  { path: "settings/themes", component: ThemesComponent },
  { path: "settings/privacy-policy", component: PrivacyPolicyComponent },
  { path: "settings/terms-of-use", component: TermsOfUseComponent },
  { path: "settings/help-and-support", component: HelpAndSupportComponent },
  { path: "settings/about-us", component: AboutUsComponent },
  { path: "settings/set-pin", component: SetPinComponent },
  { path: "settings/profile", component: ProfileComponent },
  {
    path: "master",
    children: [
      {
        path: "tax",
        component: TaxPage,
      },
      {
        path: "tax-list",
        component: TaxListComponent,
      },
      {
        path: "supplier",
        component: SupplierComponent,
      },
      {
        path: "supplier-list",
        component: SupplierListComponent,
      },
      {
        path: "custommer",
        component: CustommerComponent,
      },
      {
        path: "customer-list",
        component: CustomerListComponent,
      },
      {
        path: "sales-account",
        component: SalesAccountComponent,
      },
      {
        path: "sales-account-list",
        component: SalesAccountListComponent,
      },
      {
        path: "purchase-account",
        component: PurchaseAccountComponent,
      },
      {
        path: "purchase-account-list",
        component: PurchaseAccountListComponent,
      },
      {
        path: "stock-item",
        component: StockItemComponent,
      },
      {
        path: "stock-item-list",
        component: StockItemListComponent,
      },
      {
        path: "unit",
        component: UnitComponent,
      },
      {
        path: "unit-list",
        component: UnitListComponent,
      },
      {
        path: "voucher-type",
        component: VoucherTypeComponent,
      },
      {
        path: "voucher-type-list",
        component: VoucherTypeListComponent,
      },
      {
        path: "stock-category",
        component: StockCategoryComponent,
      },
      {
        path: "stock-category-list",
        component: StockCategoryListComponent,
      },
      {
        path: "stock-groups",
        component: StockGroupsComponent,
      },
      {
        path: "stock-group-list",
        component: StockGroupListComponent,
      },
      // discount received
      {
        path: "discount",
        component: DiscountComponent,
      },
      {
        path: "discount-list",
        component: DiscountListComponent,
      },
      // Discount Paid
      {
        path: "discount-paid",
        component: DiscountPaidComponent,
      },
      {
        path: "discount-paid-list",
        component: DiscountPaidListComponent,
      },
      // ================================
      {
        path: "other-charges",
        component: OtherChargesComponent,
      },
      {
        path: "other-charges-list",
        component: OtherChargesListComponent,
      },
      // round off less
      {
        path: "round-off",
        component: RoundOffComponent,
      },
      {
        path: "round-off-list",
        component: RoundOffListComponent,
      },
      // round of add
      {
        path: "round-off-add",
        component: RoundOffAddComponent,
      },
      {
        path: "round-off-add-list",
        component: RoundOffAddListComponent,
      },
      {
        path: "cost-center",
        component: CostCenterComponent,
      },
      {
        path: "cost-center-list",
        component: CostCenterListComponent,
      },
      {
        path: "godown",
        component: GodownComponent,
      },
      {
        path: "godown-list",
        component: GodownListComponent,
      },
      {
        path: "miscellaneous",
        component: MiscellaneousComponent,
      },
      {
        path: "miscellaneous-list",
        component: MiscellaneousListComponent,
      },
    ],
  },
  {
    path: "payment",
    children: [
      {
        path: "bank",
        component: BankComponent,
      },
      {
        path: "bank-list",
        component: BankListComponent,
      },
      {
        path: "cash",
        component: CashComponent,
      },
      {
        path: "cash-list",
        component: CashListComponent,
      },
      {
        path: "e-fund",
        component: EFundComponent,
      },
      {
        path: "e-fund-list",
        component: EFundListComponent,
      },
    ],
  },
  {
    path: "transaction",
    children: [
      { path: "delivery-note", component: DeliveryNoteComponent },
      { path: "delivery-note-list", component: DeliveryNoteListComponent },
      { path: "journal", component: JournalComponent },
      { path: "journal-list", component: JournalListComponent },
      { path: "payment", component: PaymentComponent },
      { path: "payment-list", component: PaymentListComponent },
      { path: "purchase", component: TransactionPurchaseComponent },
      { path: "add-item", component: AddItemsComponent },
      { path: "purchase-list", component: PurchaseListComponent },
      { path: "purchase-order", component: PurchaseOrderComponent },
      { path: "purchase-order-list", component: PurchaseOrderListComponent },
      { path: "purchase-return", component: PurchaseReturnComponent },
      { path: "purchase-return-list", component: PurchaseReturnListComponent },
      { path: "receipt", component: ReceiptComponent },
      { path: "receipt-list", component: ReceiptListComponent },
      { path: "sales", component: TransactionSalesComponent },
      { path: "sales-list", component: SalesListComponent },
      { path: "sales-order", component: SalesOrderComponent },
      { path: "sales-order-list", component: SalesOrderListComponent },
      { path: "sales-return", component: SalesReturnComponent },
      { path: "sales-return-list", component: SalesReturnListComponent },
      { path: "add-more-lagers", component: AddMoreLagersComponent },
      {
        path: "add-item-delivery-note",
        component: AddItemDeliveryNoteComponent,
      },
      {
        path: "add-ledgers-delivery-note",
        component: AddLedgersDeliveryNoteComponent,
      },
      {
        path: "add-ledgers-payment",
        component: AddLedgersPaymentComponent,
      },
      {
        path: "add-bill-sundry-details",
        component: AddBillSandryDetailsComponent,
      },
    ],
  },
  {
    path: "my-companies",
    component: MyCompaniesComponent,
  },
  { path: "sales", component: SalesComponent },
  { path: "purchase", component: PurchaseComponent },
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "stock", component: StockComponent },
      { path: "report", component: ReportComponent },
      { path: "add-entry", component: AddEntryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
