import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { UnitListComponent } from "./unit-list.component";

const routes: Routes = [
  {
    path: "",
    component: UnitListComponent,
  },
];

@NgModule({
  declarations: [UnitListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [UnitListComponent],
})
export class UnitListModule {}
