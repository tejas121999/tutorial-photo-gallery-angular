import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockGroupsComponent } from './stock-groups.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: StockGroupsComponent }
];

@NgModule({
  declarations: [StockGroupsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class StockGroupsModule {}
