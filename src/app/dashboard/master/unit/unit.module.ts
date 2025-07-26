import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitComponent } from './unit.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UnitComponent }
];

@NgModule({
  declarations: [UnitComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class UnitModule {}
