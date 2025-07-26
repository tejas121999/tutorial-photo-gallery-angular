import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GodownComponent } from './godown.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: GodownComponent }
];

@NgModule({
  declarations: [GodownComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class GodownModule {}
