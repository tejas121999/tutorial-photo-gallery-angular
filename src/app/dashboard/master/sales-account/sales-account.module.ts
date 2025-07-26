import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesAccountComponent } from './sales-account.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SalesAccountComponent }
];

@NgModule({
  declarations: [SalesAccountComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class SalesAccountModule {}
