import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GodownComponent } from './godown.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: GodownComponent }
];

@NgModule({
  declarations: [GodownComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class GodownModule {}
