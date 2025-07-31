import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { StockCategoryListComponent } from "./stock-category-list.component";

const routes: Routes = [
  {
    path: "",
    component: StockCategoryListComponent,
  },
];

@NgModule({
  declarations: [StockCategoryListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [StockCategoryListComponent],
})
export class StockCategoryListModule {}
