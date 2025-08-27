import { Component } from "@angular/core";
import { SettingsNavigationService } from "../settings/settings-navigation.service";

@Component({
  selector: "app-rate-us",
  templateUrl: "./rate-us.component.html",
  styleUrls: ["./rate-us.component.scss"],
})
export class RateUsComponent {
  constructor(private settingsNavigation: SettingsNavigationService) {}

  navigateToHome() {
    this.settingsNavigation.navigateToHomeWithRefresh();
  }

  navigateToReport() {
    this.settingsNavigation.navigateToReportWithRefresh();
  }

  navigateToAddEntry() {
    this.settingsNavigation.navigateToAddEntryWithRefresh();
  }
}
