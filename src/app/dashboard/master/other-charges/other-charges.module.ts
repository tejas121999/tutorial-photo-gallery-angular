import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OtherChargesComponent } from "./other-charges.component";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: OtherChargesComponent }];

@NgModule({
  declarations: [OtherChargesComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class OtherChargesModule {}
