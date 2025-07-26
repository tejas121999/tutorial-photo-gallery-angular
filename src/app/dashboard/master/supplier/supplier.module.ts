import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SupplierComponent }
];

@NgModule({
  declarations: [SupplierComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class SupplierModule {}
