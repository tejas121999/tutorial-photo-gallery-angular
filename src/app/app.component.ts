import { Component } from "@angular/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { ActivatedRoute, Router } from "@angular/router";
import { App } from "@capacitor/app";
import { Platform } from "@ionic/angular";
import { AppPreference } from "./shared/app-preference";
import { StatusBar, Style } from "@capacitor/status-bar";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  private lastTimeBackPress = 0;
  private timePeriodToExit = 2000;
  login_token: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private platform: Platform,
    private appPreference: AppPreference
  ) {
    this.initializeApp();
    this.setupBackButtonHandler();
    this.platform.ready().then(() => {
      StatusBar.hide();
      StatusBar.setStyle({ style: Style.Light }); // Optional: Adjust style
      StatusBar.setOverlaysWebView({ overlay: false }); // Prevent overlap
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.login_token = await this.appPreference.get("_LoginToken");
      const userDetail = await this.appPreference.get("_UserDetail");
    });
  }

  private async setupBackButtonHandler() {
    await this.platform.ready();

    App.addListener("backButton", async () => {
      const currentUrl = this.router.url;

      // If not logged in and at login page, handle exit
      if (currentUrl === "/") {
        if (
          new Date().getTime() - this.lastTimeBackPress <
          this.timePeriodToExit
        ) {
          App.exitApp();
        } else {
          this.lastTimeBackPress = new Date().getTime();
          this.appPreference.presentToast("Press back again to exit", 2000);
        }
        return;
      }

      // If logged in and at dashboard root or home, handle exit
      // if (!this.login_token) {
      //   if (currentUrl === "/dashboard" || currentUrl === "/dashboard/home") {
      //     if (
      //       new Date().getTime() - this.lastTimeBackPress <
      //       this.timePeriodToExit
      //     ) {
      //       App.exitApp();
      //     } else {
      //       this.lastTimeBackPress = new Date().getTime();
      //       this.appPreference.presentToast("Press back again to exit", 2000);
      //     }
      //     return;
      //   }
      // }

      // if (currentUrl === "/dashboard/master/tax-list") {
      //   if (this.login_token) {
      //     this.router.navigate(["/dashboard/home"], { replaceUrl: true });
      //   }
      // }

      // if (currentUrl === "/dashboard/master/tax") {
      //   if (this.login_token) {
      //     this.router.navigate(["/dashboard/home"], { replaceUrl: true });
      //   }
      // }

      // if (currentUrl === "/dashboard/master/supplier-list") {
      //   if (this.login_token) {
      //     this.router.navigate(["/dashboard/home"], { replaceUrl: true });
      //   }
      // }

      // if (currentUrl === "/dashboard/master/supplier") {
      //   if (this.login_token) {
      //     this.router.navigate(["/dashboard/home"], { replaceUrl: true });
      //   }
      // }
      // if (this.login_token) {
      //   // // If logged in, always try to go to dashboard root
      //   this.router.navigate(["/dashboard/home"], { replaceUrl: true });
      //   return;
      // }

      // If not logged in, go to login page
      // this.router.navigate(["/"], { replaceUrl: true });
    });
  }

  initializeApp() {
    /* To make sure we provide the fastest app loading experience
       for our users, hide the splash screen automatically
       when the app is ready to be used:

        https://capacitor.ionicframework.com/docs/apis/splash-screen#hiding-the-splash-screen
    */
    SplashScreen.hide();
  }
}
