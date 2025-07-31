import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { RoundOffListComponent } from "./round-off-list.component";

const routes: Routes = [
  {
    path: "",
    component: RoundOffListComponent,
  },
];

@NgModule({
  declarations: [RoundOffListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [RoundOffListComponent],
})
export class RoundOffListModule {}
