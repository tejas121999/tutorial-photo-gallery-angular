import { Component, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { IonMenu } from "@ionic/angular";
import { register } from "swiper/element/bundle";
import { AppPreference } from "../shared/app-preference";
import { Router } from "@angular/router";

register();
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements AfterViewInit {
  showMaster = false;
  showDiscount = false;
  showRoundOff = false;
  @ViewChild(IonMenu) menu: IonMenu;
  @ViewChild("dashboardMain", { static: true }) dashboardMain: ElementRef;

  constructor(private appPreference: AppPreference, private router: Router) {}

  closeMenu() {
    if (this.menu) {
      this.menu.close();
    }
  }

  ngAfterViewInit() {
    this.dashboardMain?.nativeElement.focus();
    if (this.menu && this.menu.ionDidClose) {
      this.menu.ionDidClose.subscribe(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
    }
  }

  async onLogout() {
    try {
      await this.appPreference.clear();
      await this.appPreference.presentToast("Logged out successfully!");
      this.router.navigate(["/"]);
    } catch (error) {
      console.error("Logout failed", error);
      await this.appPreference.presentToast(
        "Logout failed. Please try again.",
        2000,
        "bottom",
        "danger"
      );
    }
  }
}
