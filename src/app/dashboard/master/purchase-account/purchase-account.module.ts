import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseAccountComponent } from './purchase-account.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PurchaseAccountComponent }
];

@NgModule({
  declarations: [PurchaseAccountComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class PurchaseAccountModule {}
