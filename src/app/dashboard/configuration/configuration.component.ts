import { Component } from "@angular/core";
import { SettingsNavigationService } from "../settings/settings-navigation.service";

@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
  styleUrls: ["./configuration.component.scss"],
})
export class ConfigurationComponent {
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
