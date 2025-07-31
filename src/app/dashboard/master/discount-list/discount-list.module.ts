import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { DiscountListComponent } from "./discount-list.component";

const routes: Routes = [
  {
    path: "",
    component: DiscountListComponent,
  },
];

@NgModule({
  declarations: [DiscountListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [DiscountListComponent],
})
export class DiscountListModule {}
