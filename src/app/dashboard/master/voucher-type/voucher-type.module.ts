import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoucherTypeComponent } from './voucher-type.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: VoucherTypeComponent }
];

@NgModule({
  declarations: [VoucherTypeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class VoucherTypeModule {}
