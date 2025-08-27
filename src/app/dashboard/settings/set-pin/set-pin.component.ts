import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppPreference, PreferenceKeys } from "src/app/shared/app-preference";
import { SettingsNavigationService } from "../settings-navigation.service";

@Component({
  selector: "app-set-pin",
  templateUrl: "./set-pin.component.html",
  styleUrls: ["./set-pin.component.scss"],
})
export class SetPinComponent implements OnInit {
  pin: string[] = ["", "", "", ""];

  constructor(
    private appPreference: AppPreference,
    private router: Router,
    private route: ActivatedRoute,
    private settingsNavigation: SettingsNavigationService
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed delete account");
    });
  }

  addNumber(num: string) {
    const emptyIndex = this.pin.findIndex((digit) => digit === "");
    if (emptyIndex !== -1) {
      this.pin[emptyIndex] = num;

      // If PIN is complete (all 4 digits entered)
      if (emptyIndex === 3) {
        // Here you can add logic to save the PIN
        console.log("PIN complete:", this.pin.join(""));
      }
    }
  }

  deleteNumber() {
    const lastFilledIndex = this.pin
      .map((digit) => digit !== "")
      .lastIndexOf(true);
    if (lastFilledIndex !== -1) {
      this.pin[lastFilledIndex] = "";
    }
  }

  async submitPin() {
    if (this.pin.every((digit) => digit !== "")) {
      const finalPin = this.pin.join("");
      try {
        await this.appPreference.enablePin(finalPin);
        await this.appPreference.presentToast(
          "PIN set successfully",
          2000,
          "bottom",
          "success"
        );
        this.router.navigate(["/dashboard/settings"]);
      } catch (error) {
        console.error("Error saving PIN:", error);
        await this.appPreference.presentToast(
          "Failed to set PIN",
          2000,
          "bottom",
          "danger"
        );
      }
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
}
