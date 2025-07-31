import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { VoucherTypeListComponent } from "./voucher-type-list.component";

const routes: Routes = [
  {
    path: "",
    component: VoucherTypeListComponent,
  },
];

@NgModule({
  declarations: [VoucherTypeListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [VoucherTypeListComponent],
})
export class VoucherTypeListModule {}
