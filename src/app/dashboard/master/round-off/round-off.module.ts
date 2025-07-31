import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoundOffComponent } from "./round-off.component";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: RoundOffComponent }];

@NgModule({
  declarations: [RoundOffComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class RoundOffModule {}
