import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  declarations: [DashboardComponent, HomeComponent, PaymentComponent, TransactionComponent],
  imports: [CommonModule, IonicModule, RouterModule, DashboardRoutingModule]
})
export class DashboardModule {}
