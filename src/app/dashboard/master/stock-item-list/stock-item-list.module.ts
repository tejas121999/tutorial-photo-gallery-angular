import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { StockItemListComponent } from "./stock-item-list.component";

const routes: Routes = [
  {
    path: "",
    component: StockItemListComponent,
  },
];

@NgModule({
  declarations: [StockItemListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [StockItemListComponent],
})
export class StockItemListModule {}
