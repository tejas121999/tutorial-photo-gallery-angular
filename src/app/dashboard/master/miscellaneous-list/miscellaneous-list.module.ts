import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { MiscellaneousListComponent } from "./miscellaneous-list.component";

const routes: Routes = [
  {
    path: "",
    component: MiscellaneousListComponent,
  },
];

@NgModule({
  declarations: [MiscellaneousListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [MiscellaneousListComponent],
})
export class MiscellaneousListModule {}
