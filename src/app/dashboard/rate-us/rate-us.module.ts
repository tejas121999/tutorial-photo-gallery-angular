import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RateUsComponent } from './rate-us.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RateUsComponent }
];

@NgModule({
  declarations: [RateUsComponent],
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes)]
})
export class RateUsModule {}
