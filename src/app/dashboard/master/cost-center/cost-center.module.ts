import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostCenterComponent } from './cost-center.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: CostCenterComponent }
];

@NgModule({
  declarations: [CostCenterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CostCenterModule {}
