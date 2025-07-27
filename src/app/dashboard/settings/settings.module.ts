import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';

import { ConnectToTallyComponent } from './connect-to-tally/connect-to-tally.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ProComponent } from './pro/pro.component';
import { PaymentReminderComponent } from './payment-reminder/payment-reminder.component';
import { CurrencyFormatComponent } from './currency-format/currency-format.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { ThemesComponent } from './themes/themes.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { HelpAndSupportComponent } from './help-and-support/help-and-support.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [SettingsComponent, ProfileComponent, ConnectToTallyComponent, ProComponent, PaymentReminderComponent, CurrencyFormatComponent, DeleteAccountComponent, ThemesComponent, PrivacyPolicyComponent, TermsOfUseComponent, HelpAndSupportComponent, AboutUsComponent],
  imports: [CommonModule, IonicModule, SettingsRoutingModule]
})
export class SettingsModule {}
