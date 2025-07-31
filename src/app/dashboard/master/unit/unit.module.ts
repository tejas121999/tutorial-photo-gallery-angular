import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UnitComponent } from "./unit.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

const routes: Routes = [{ path: "", component: UnitComponent }];

@NgModule({
  declarations: [UnitComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class UnitModule {}
