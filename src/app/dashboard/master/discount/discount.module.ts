import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DiscountComponent }
];

@NgModule({
  declarations: [DiscountComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class DiscountModule {}
