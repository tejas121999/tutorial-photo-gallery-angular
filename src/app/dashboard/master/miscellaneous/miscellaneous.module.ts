import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscellaneousComponent } from './miscellaneous.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MiscellaneousComponent }
];

@NgModule({
  declarations: [MiscellaneousComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class MiscellaneousModule {}
