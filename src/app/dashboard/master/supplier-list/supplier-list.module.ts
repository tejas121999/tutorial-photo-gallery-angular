import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SupplierListComponent } from "./supplier-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "", component: SupplierListComponent }];

@NgModule({
  declarations: [SupplierListComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class SupplierListModule {}
