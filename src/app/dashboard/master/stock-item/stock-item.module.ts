import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockItemComponent } from './stock-item.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: StockItemComponent }
];

@NgModule({
  declarations: [StockItemComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class StockItemModule {}
