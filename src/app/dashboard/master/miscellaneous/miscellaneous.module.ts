import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MiscellaneousComponent } from "./miscellaneous.component";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: MiscellaneousComponent }];

@NgModule({
  declarations: [MiscellaneousComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class MiscellaneousModule {}
