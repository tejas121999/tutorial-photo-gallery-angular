import { Component, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { IonMenu } from "@ionic/angular";
import { register } from "swiper/element/bundle";
import { AppPreference } from "../shared/app-preference";
import { ActivatedRoute, Router } from "@angular/router";

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
  branch_token: any;
  login_token: any;
  user_name: string = "";
  @ViewChild(IonMenu) menu: IonMenu;
  @ViewChild("dashboardMain", { static: true }) dashboardMain: ElementRef;

  constructor(
    private appPreference: AppPreference,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
      this.user_name =
        (await this.appPreference.get("_UserDetail")) || "User name";
      console.log("branch_token", this.branch_token);
    });
  }
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
