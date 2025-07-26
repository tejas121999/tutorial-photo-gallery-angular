import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostCenterComponent } from './cost-center.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CostCenterComponent }
];

@NgModule({
  declarations: [CostCenterComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class CostCenterModule {}
