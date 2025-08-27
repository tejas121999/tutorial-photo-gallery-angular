import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent {
  isPinEnabled: boolean = false;
  isFingerprintEnabled: boolean = false;

  constructor(
    private router: Router,
    private appPreference: AppPreference,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed settings");
      this.isPinEnabled = await this.appPreference.isPinEnabled();
      this.isFingerprintEnabled =
        await this.appPreference.isFingerprintEnabled();
    });
  }

  // isChildRouteActive(): boolean {
  //   // Checks if the current route is exactly /dashboard/settings
  //   // If not, a child route is active
  //   return this.router.url !== "/dashboard/settings";
  // }

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
      this.router.navigate(["/dashboard/settings/set-pin"]);
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
}
