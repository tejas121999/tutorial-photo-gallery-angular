import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConfigurationComponent } from './configuration.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ConfigurationComponent }
];

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes)]
})
export class ConfigurationModule {}
