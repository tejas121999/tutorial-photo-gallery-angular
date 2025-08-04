import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { HomeComponent } from "./home/home.component";
import { PaymentComponent } from "./payment/payment.component";
import { TransactionComponent } from "./transaction/transaction.component";
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

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    PaymentComponent,
    TransactionComponent,
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
