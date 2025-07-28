import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PurchaseAccountComponent } from "./purchase-account.component";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: PurchaseAccountComponent }];

@NgModule({
  declarations: [PurchaseAccountComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class PurchaseAccountModule {}
