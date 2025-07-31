import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StockCategoryComponent } from "./stock-category.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

const routes: Routes = [{ path: "", component: StockCategoryComponent }];

@NgModule({
  declarations: [StockCategoryComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class StockCategoryModule {}
