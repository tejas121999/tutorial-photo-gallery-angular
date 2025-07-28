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
        path: "supplier",
        loadChildren: () =>
          import("./master/supplier/supplier.module").then(
            (m) => m.SupplierModule
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
        path: "sales-account",
        loadChildren: () =>
          import("./master/sales-account/sales-account.module").then(
            (m) => m.SalesAccountModule
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
        path: "stock-item",
        loadChildren: () =>
          import("./master/stock-item/stock-item.module").then(
            (m) => m.StockItemModule
          ),
      },
      {
        path: "unit",
        loadChildren: () =>
          import("./master/unit/unit.module").then((m) => m.UnitModule),
      },
      {
        path: "voucher-type",
        loadChildren: () =>
          import("./master/voucher-type/voucher-type.module").then(
            (m) => m.VoucherTypeModule
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
        path: "stock-groups",
        loadChildren: () =>
          import("./master/stock-groups/stock-groups.module").then(
            (m) => m.StockGroupsModule
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
        path: "other-charges",
        loadChildren: () =>
          import("./master/other-charges/other-charges.module").then(
            (m) => m.OtherChargesModule
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
        path: "cost-center",
        loadChildren: () =>
          import("./master/cost-center/cost-center.module").then(
            (m) => m.CostCenterModule
          ),
      },
      {
        path: "godown",
        loadChildren: () =>
          import("./master/godown/godown.module").then((m) => m.GodownModule),
      },
      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./master/miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
      },
    ],
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "home", component: HomeComponent },

      { path: "", redirectTo: "home", pathMatch: "full" },
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
