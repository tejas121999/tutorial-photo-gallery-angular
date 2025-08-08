import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./home/home.component";
import { PaymentComponent } from "./payment/payment.component";
import { TransactionComponent } from "./transaction/transaction.component";
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
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsModule),
  },
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
    path: "",
    component: DashboardComponent,
    children: [
      { path: "home", component: HomeComponent },
    ],
  },
  {
    path: "my-companies",
    component: MyCompaniesComponent,
  },
  { path: "stock", component: StockComponent },
  { path: "report", component: ReportComponent },
  { path: "add-entry", component: AddEntryComponent },
  { path: "sales", component: SalesComponent },
  { path: "purchase", component: PurchaseComponent },
  { path: "payment", component: PaymentComponent },
  { path: "transaction", component: TransactionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
