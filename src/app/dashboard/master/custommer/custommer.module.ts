import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustommerComponent } from "./custommer.component";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: CustommerComponent }];

@NgModule({
  declarations: [CustommerComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class CustommerModule {}
