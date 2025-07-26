import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundOffComponent } from './round-off.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RoundOffComponent }
];

@NgModule({
  declarations: [RoundOffComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class RoundOffModule {}
