import { Component, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { IonMenu } from "@ionic/angular";
import { register } from "swiper/element/bundle";
import { AppPreference } from "../shared/app-preference";
import { ActivatedRoute, Router } from "@angular/router";
import { App } from "@capacitor/app";
import { Platform } from "@ionic/angular";

register();
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements AfterViewInit {
  showMaster = false;
  showPayment = false;
  showTransaction = false;
  showDiscount = false;
  showRoundOff = false;
  branch_token: any;
  login_token: any;
  user_name: string = "";
  currentUrl: string = "";
  branch_name: any = "";
  showSearchbar = false;
  user_email: any;

  @ViewChild(IonMenu) menu: IonMenu;
  @ViewChild("dashboardMain", { static: true }) dashboardMain: ElementRef;

  constructor(
    private appPreference: AppPreference,
    private router: Router,
    private route: ActivatedRoute,
    private platform: Platform
  ) { }

  async ngOnInit() {
    // window.location.reload();
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed dashboard");
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.branch_name = await this.appPreference.get("branch_name");
      this.login_token = await this.appPreference.get("_LoginToken");
      const userDetail = await this.appPreference.get("_UserDetail");
      this.user_name = userDetail?.user_name;
      this.user_email = userDetail?.user_email;
      this.currentUrl = this.router.url;
      this.closeMenu();
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
      await this.appPreference.remove("_LoginToken");
      await this.appPreference.remove("branch_token_id");
      await this.appPreference.remove('ACCESS_TOKEN')
      localStorage.removeItem("ACCESS_TOKEN");
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

  handleInput(event: Event) { }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
