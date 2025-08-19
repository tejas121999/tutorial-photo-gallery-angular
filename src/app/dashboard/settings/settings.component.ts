import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent {
  isPinEnabled: boolean = false;

  constructor(private router: Router, private appPreference: AppPreference) {}

  async ngOnInit() {
    this.isPinEnabled = await this.appPreference.isPinEnabled();
    console.log(
      "await this.appPreference.isPinEnabled()",
      await this.appPreference.isPinEnabled()
    );
    console.log(
      "await this.appPreference.getPin()",
      await this.appPreference.getPin()
    );
  }

  isChildRouteActive(): boolean {
    // Checks if the current route is exactly /dashboard/settings
    // If not, a child route is active
    return this.router.url !== "/dashboard/settings";
  }

  onSetPinToggle(event: any) {
    if (event.detail.checked) {
      this.router.navigate(["/dashboard/settings/set-pin"]);
    }
  }
}
