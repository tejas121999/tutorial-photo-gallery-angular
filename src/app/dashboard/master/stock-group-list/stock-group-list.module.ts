import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { StockGroupListComponent } from "./stock-group-list.component";

const routes: Routes = [
  {
    path: "",
    component: StockGroupListComponent,
  },
];

@NgModule({
  declarations: [StockGroupListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [StockGroupListComponent],
})
export class StockGroupListModule {}
