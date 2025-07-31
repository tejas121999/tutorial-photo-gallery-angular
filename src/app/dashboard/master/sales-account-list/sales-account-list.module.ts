import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalesAccountListComponent } from "./sales-account-list.component";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: SalesAccountListComponent,
  },
];

@NgModule({
  declarations: [SalesAccountListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [SalesAccountListComponent],
})
export class SalesAccountListModule {}
