import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SupplierComponent }
];

@NgModule({
  declarations: [SupplierComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class SupplierModule {}
