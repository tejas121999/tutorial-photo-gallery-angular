import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./home/home.component";
import { PaymentComponent } from "./payment/payment.component";
import { TransactionComponent } from "./transaction/transaction.component";

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
        loadChildren: () =>
          import("./master/tax/tax.module").then((m) => m.TaxModule),
      },
      {
        path: "tax-list",
        loadChildren: () =>
          import("./master/tax-list/tax-list.module").then(
            (m) => m.TaxListModule
          ),
      },
      {
        path: "supplier",
        loadChildren: () =>
          import("./master/supplier/supplier.module").then(
            (m) => m.SupplierModule
          ),
      },
      {
        path: "supplier-list",
        loadChildren: () =>
          import("./master/supplier-list/supplier-list.module").then(
            (m) => m.SupplierListModule
          ),
      },
      {
        path: "custommer",
        loadChildren: () =>
          import("./master/custommer/custommer.module").then(
            (m) => m.CustommerModule
          ),
      },
      {
        path: "customer-list",
        loadChildren: () =>
          import("./master/customer-list/customer-list.module").then(
            (m) => m.CustomerListModule
          ),
      },
      {
        path: "sales-account",
        loadChildren: () =>
          import("./master/sales-account/sales-account.module").then(
            (m) => m.SalesAccountModule
          ),
      },
      {
        path: "sales-account-list",
        loadChildren: () =>
          import("./master/sales-account-list/sales-account-list.module").then(
            (m) => m.SalesAccountListModule
          ),
      },
      {
        path: "purchase-account",
        loadChildren: () =>
          import("./master/purchase-account/purchase-account.module").then(
            (m) => m.PurchaseAccountModule
          ),
      },
      {
        path: "purchase-account-list",
        loadChildren: () =>
          import(
            "./master/purchase-account-list/purchase-account-list.module"
          ).then((m) => m.PurchaseAccountListModule),
      },
      {
        path: "stock-item",
        loadChildren: () =>
          import("./master/stock-item/stock-item.module").then(
            (m) => m.StockItemModule
          ),
      },
      {
        path: "stock-item-list",
        loadChildren: () =>
          import("./master/stock-item-list/stock-item-list.module").then(
            (m) => m.StockItemListModule
          ),
      },
      {
        path: "unit",
        loadChildren: () =>
          import("./master/unit/unit.module").then((m) => m.UnitModule),
      },
      {
        path: "unit-list",
        loadChildren: () =>
          import("./master/unit-list/unit-list.module").then(
            (m) => m.UnitListModule
          ),
      },
      {
        path: "voucher-type",
        loadChildren: () =>
          import("./master/voucher-type/voucher-type.module").then(
            (m) => m.VoucherTypeModule
          ),
      },
      {
        path: "voucher-type-list",
        loadChildren: () =>
          import("./master/voucher-type-list/voucher-type-list.module").then(
            (m) => m.VoucherTypeListModule
          ),
      },
      {
        path: "stock-category",
        loadChildren: () =>
          import("./master/stock-category/stock-category.module").then(
            (m) => m.StockCategoryModule
          ),
      },
      {
        path: "stock-category-list",
        loadChildren: () =>
          import(
            "./master/stock-category-list/stock-category-list.module"
          ).then((m) => m.StockCategoryListModule),
      },
      {
        path: "stock-groups",
        loadChildren: () =>
          import("./master/stock-groups/stock-groups.module").then(
            (m) => m.StockGroupsModule
          ),
      },
      {
        path: "stock-group-list",
        loadChildren: () =>
          import("./master/stock-group-list/stock-group-list.module").then(
            (m) => m.StockGroupListModule
          ),
      },
      {
        path: "discount",
        loadChildren: () =>
          import("./master/discount/discount.module").then(
            (m) => m.DiscountModule
          ),
      },
      {
        path: "discount-list",
        loadChildren: () =>
          import("./master/discount-list/discount-list.module").then(
            (m) => m.DiscountListModule
          ),
      },
      {
        path: "other-charges",
        loadChildren: () =>
          import("./master/other-charges/other-charges.module").then(
            (m) => m.OtherChargesModule
          ),
      },
      {
        path: "other-charges-list",
        loadChildren: () =>
          import("./master/other-charges-list/other-charges-list.module").then(
            (m) => m.OtherChargesListModule
          ),
      },
      {
        path: "round-off",
        loadChildren: () =>
          import("./master/round-off/round-off.module").then(
            (m) => m.RoundOffModule
          ),
      },
      {
        path: "round-off-list",
        loadChildren: () =>
          import("./master/round-off-list/round-off-list.module").then(
            (m) => m.RoundOffListModule
          ),
      },
      {
        path: "cost-center",
        loadChildren: () =>
          import("./master/cost-center/cost-center.module").then(
            (m) => m.CostCenterModule
          ),
      },
      {
        path: "cost-center-list",
        loadChildren: () =>
          import("./master/cost-center-list/cost-center-list.module").then(
            (m) => m.CostCenterListModule
          ),
      },
      {
        path: "godown",
        loadChildren: () =>
          import("./master/godown/godown.module").then((m) => m.GodownModule),
      },
      {
        path: "godown-list",
        loadChildren: () =>
          import("./master/godown-list/godown-list.module").then(
            (m) => m.GodownListModule
          ),
      },
      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./master/miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
      },
      {
        path: "miscellaneous-list",
        loadChildren: () =>
          import("./master/miscellaneous-list/miscellaneous-list.module").then(
            (m) => m.MiscellaneousListModule
          ),
      },
    ],
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
    ],
  },
  { path: "payment", component: PaymentComponent },
  { path: "transaction", component: TransactionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
