import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoucherTypeComponent } from './voucher-type.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: VoucherTypeComponent }
];

@NgModule({
  declarations: [VoucherTypeComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class VoucherTypeModule {}
