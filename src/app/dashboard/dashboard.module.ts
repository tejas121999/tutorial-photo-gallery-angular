import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { HomeComponent } from "./home/home.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TaxPage } from "./master/tax/tax.page";
import { TaxListComponent } from "./master/tax-list/tax-list.component";
import { SupplierListComponent } from "./master/supplier-list/supplier-list.component";
import { SupplierComponent } from "./master/supplier/supplier.component";
import { CustommerComponent } from "./master/custommer/custommer.component";
import { CustomerListComponent } from "./master/customer-list/customer-list.component";
import { SalesAccountComponent } from "./master/sales-account/sales-account.component";
import { SalesAccountListComponent } from "./master/sales-account-list/sales-account-list.component";
import { PurchaseAccountComponent } from "./master/purchase-account/purchase-account.component";
import { PurchaseAccountListComponent } from "./master/purchase-account-list/purchase-account-list.component";
import { StockItemListComponent } from "./master/stock-item-list/stock-item-list.component";
import { StockItemComponent } from "./master/stock-item/stock-item.component";
import { UnitComponent } from "./master/unit/unit.component";
import { UnitListComponent } from "./master/unit-list/unit-list.component";
import { VoucherTypeComponent } from "./master/voucher-type/voucher-type.component";
import { VoucherTypeListComponent } from "./master/voucher-type-list/voucher-type-list.component";
import { StockCategoryListComponent } from "./master/stock-category-list/stock-category-list.component";
import { StockCategoryComponent } from "./master/stock-category/stock-category.component";
import { StockGroupsComponent } from "./master/stock-groups/stock-groups.component";
import { StockGroupListComponent } from "./master/stock-group-list/stock-group-list.component";
import { DiscountComponent } from "./master/discount/discount.component";
import { DiscountListComponent } from "./master/discount-list/discount-list.component";
import { OtherChargesListComponent } from "./master/other-charges-list/other-charges-list.component";
import { OtherChargesComponent } from "./master/other-charges/other-charges.component";
import { RoundOffComponent } from "./master/round-off/round-off.component";
import { RoundOffListComponent } from "./master/round-off-list/round-off-list.component";
import { CostCenterComponent } from "./master/cost-center/cost-center.component";
import { CostCenterListComponent } from "./master/cost-center-list/cost-center-list.component";
import { GodownComponent } from "./master/godown/godown.component";
import { GodownListComponent } from "./master/godown-list/godown-list.component";
import { MiscellaneousComponent } from "./master/miscellaneous/miscellaneous.component";
import { MiscellaneousListComponent } from "./master/miscellaneous-list/miscellaneous-list.component";
import { PurchaseComponent } from "./purchase/purchase.component";
import { SalesComponent } from "./sales/sales.component";
import { DiscountPaidComponent } from "./master/discount-paid/discount-paid.component";
import { DiscountPaidListComponent } from "./master/discount-paid-list/discount-paid-list.component";
import { RoundOffAddComponent } from "./master/round-off-add/round-off-add.component";
import { RoundOffAddListComponent } from "./master/round-off-add-list/round-off-add-list.component";
import { MyCompaniesComponent } from "./my-companies/my-companies.component";
import { StockComponent } from "./stock/stock.component";
import { ReportComponent } from "./report/report.component";
import { AddEntryComponent } from "./add-entry/add-entry.component";
import { SetPinComponent } from "./settings/set-pin/set-pin.component";
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
import { ProfileComponent } from "./settings/profile/profile.component";
import { SettingsComponent } from "./settings/settings.component";

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    TaxPage,
    TaxListComponent,
    SupplierComponent,
    SupplierListComponent,
    CustommerComponent,
    CustomerListComponent,
    SalesAccountComponent,
    SalesAccountListComponent,
    PurchaseAccountComponent,
    PurchaseAccountListComponent,
    StockItemListComponent,
    StockItemComponent,
    UnitComponent,
    UnitListComponent,
    VoucherTypeComponent,
    VoucherTypeListComponent,
    StockCategoryListComponent,
    StockCategoryComponent,
    StockGroupsComponent,
    StockGroupListComponent,
    DiscountComponent,
    DiscountListComponent,
    DiscountPaidComponent,
    DiscountPaidListComponent,
    OtherChargesComponent,
    OtherChargesListComponent,
    RoundOffComponent,
    RoundOffListComponent,
    CostCenterComponent,
    CostCenterListComponent,
    GodownComponent,
    GodownListComponent,
    MiscellaneousComponent,
    MiscellaneousListComponent,
    PurchaseComponent,
    SalesComponent,
    RoundOffAddComponent,
    RoundOffAddListComponent,
    MyCompaniesComponent,
    StockComponent,
    ReportComponent,
    AddEntryComponent,
    SetPinComponent,
    BankComponent,
    CashComponent,
    EFundComponent,
    BankListComponent,
    BankComponent,
    CashComponent,
    CashListComponent,
    EFundComponent,
    EFundListComponent,
    DeliveryNoteComponent,
    DeliveryNoteListComponent,
    JournalComponent,
    JournalListComponent,
    PaymentComponent,
    PaymentListComponent,
    TransactionPurchaseComponent,
    PurchaseListComponent,
    PurchaseOrderComponent,
    PurchaseOrderListComponent,
    PurchaseReturnComponent,
    PurchaseReturnListComponent,
    ReceiptComponent,
    ReceiptListComponent,
    TransactionSalesComponent,
    SalesListComponent,
    SalesOrderComponent,
    SalesOrderListComponent,
    SalesReturnComponent,
    SalesReturnListComponent,
    AddItemsComponent,
    AddMoreLagersComponent,
    AddItemDeliveryNoteComponent,
    AddLedgersDeliveryNoteComponent,
    AddLedgersPaymentComponent,
    AddBillSandryDetailsComponent,
    SettingsComponent,
    ProfileComponent,
    ConnectToTallyComponent,
    ProComponent,
    PaymentReminderComponent,
    CurrencyFormatComponent,
    DeleteAccountComponent,
    ThemesComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
    HelpAndSupportComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
