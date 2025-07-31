import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { OtherChargesListComponent } from "./other-charges-list.component";

const routes: Routes = [
  {
    path: "",
    component: OtherChargesListComponent,
  },
];

@NgModule({
  declarations: [OtherChargesListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [OtherChargesListComponent],
})
export class OtherChargesListModule {}
