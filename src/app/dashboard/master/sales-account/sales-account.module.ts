import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalesAccountComponent } from "./sales-account.component";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: SalesAccountComponent }];

@NgModule({
  declarations: [SalesAccountComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class SalesAccountModule {}
