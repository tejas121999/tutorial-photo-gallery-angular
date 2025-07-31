import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { PurchaseAccountListComponent } from "./purchase-account-list.component";

const routes: Routes = [
  {
    path: "",
    component: PurchaseAccountListComponent,
  },
];

@NgModule({
  declarations: [PurchaseAccountListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [PurchaseAccountListComponent],
})
export class PurchaseAccountListModule {}
