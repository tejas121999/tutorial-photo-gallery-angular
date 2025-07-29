import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StockItemComponent } from "./stock-item.component";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: StockItemComponent }];

@NgModule({
  declarations: [StockItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class StockItemModule {}
