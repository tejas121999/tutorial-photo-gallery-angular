import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { CostCenterListComponent } from "./cost-center-list.component";

const routes: Routes = [
  {
    path: "",
    component: CostCenterListComponent,
  },
];

@NgModule({
  declarations: [CostCenterListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [CostCenterListComponent],
})
export class CostCenterListModule {}
