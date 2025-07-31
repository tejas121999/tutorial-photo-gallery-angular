import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { GodownListComponent } from "./godown-list.component";

const routes: Routes = [
  {
    path: "",
    component: GodownListComponent,
  },
];

@NgModule({
  declarations: [GodownListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [GodownListComponent],
})
export class GodownListModule {}
