import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockCategoryComponent } from './stock-category.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: StockCategoryComponent }
];

@NgModule({
  declarations: [StockCategoryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class StockCategoryModule {}
