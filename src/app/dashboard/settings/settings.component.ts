import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppPreference } from "src/app/shared/app-preference";
import { SettingsNavigationService } from "./settings-navigation.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent {
  isPinEnabled: boolean = false;
  isFingerprintEnabled: boolean = false;

  constructor(
    private appPreference: AppPreference,
    private route: ActivatedRoute,
    private settingsNavigation: SettingsNavigationService
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed settings");
      this.isPinEnabled = await this.appPreference.isPinEnabled();
      this.isFingerprintEnabled =
        await this.appPreference.isFingerprintEnabled();
    });
  }

  onSetFingerPrint(event: any) {
    if (event.detail.checked) {
      this.appPreference.enableFingerprint();
      this.appPreference.presentToast(
        "Fingerprint enabled",
        2000,
        "bottom",
        "success"
      );
    } else {
      this.appPreference.disableFingerprint();
      this.appPreference.presentToast(
        "Fingerprint disabled",
        2000,
        "bottom",
        "warning"
      );
    }
  }

  onSetPinToggle(event: any) {
    console.log(event.detail.checked);
    if (event.detail.checked) {
      this.settingsNavigation.navigateToSetPin();
    }
    if (!event.detail.checked) {
      this.appPreference.disablePin();
      this.appPreference.presentToast(
        "PIN disabled",
        2000,
        "bottom",
        "success"
      );
    }
  }

  navigateToHome() {
    this.settingsNavigation.navigateToHomeWithRefresh();
  }

  navigateToReport() {
    this.settingsNavigation.navigateToReportWithRefresh();
  }

  navigateToAddEntry() {
    this.settingsNavigation.navigateToAddEntryWithRefresh();
  }

  navigateToProfile() {
    this.settingsNavigation.navigateToProfile();
  }
}
