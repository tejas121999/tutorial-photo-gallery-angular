import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  { path: "connect-to-tally", component: ConnectToTallyComponent },
  { path: "pro", component: ProComponent },
  { path: "payment-reminder", component: PaymentReminderComponent },
  { path: "currency-format", component: CurrencyFormatComponent },
  { path: "delete-account", component: DeleteAccountComponent },
  { path: "themes", component: ThemesComponent },
  { path: "privacy-policy", component: PrivacyPolicyComponent },
  { path: "terms-of-use", component: TermsOfUseComponent },
  { path: "help-and-support", component: HelpAndSupportComponent },
  { path: "about-us", component: AboutUsComponent },
  {
    path: "",
    component: SettingsComponent,
  },
  { path: "profile", component: ProfileComponent },
];

import { ConnectToTallyComponent } from "./connect-to-tally/connect-to-tally.component";
import { ProComponent } from "./pro/pro.component";
import { PaymentReminderComponent } from "./payment-reminder/payment-reminder.component";
import { CurrencyFormatComponent } from "./currency-format/currency-format.component";
import { DeleteAccountComponent } from "./delete-account/delete-account.component";
import { ThemesComponent } from "./themes/themes.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { TermsOfUseComponent } from "./terms-of-use/terms-of-use.component";
import { HelpAndSupportComponent } from "./help-and-support/help-and-support.component";
import { AboutUsComponent } from "./about-us/about-us.component";
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
