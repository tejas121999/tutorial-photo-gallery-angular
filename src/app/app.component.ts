import { Component } from "@angular/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { ActivatedRoute, Router } from "@angular/router";
import { App } from "@capacitor/app";
import { Platform } from "@ionic/angular";
import { AppPreference, PreferenceKeys } from "./shared/app-preference";
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
  access_token: any;
  isPinEnabled: any;
  isFingerprintEnabled: any;
  isInitializing = true; // Add loading state

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private platform: Platform,
    private appPreference: AppPreference
  ) {
    this.initializeApp();
    this.setupBackButtonHandler();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed");
    });
    // No-op: initial navigation handled in initializeApp()
  }

  private async setupBackButtonHandler() {
    await this.platform.ready();

    App.addListener("backButton", async () => {
      const currentUrl = this.router.url;

      // If not logged in and at login page, handle exit /dashboard/home
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

      if (currentUrl === "/dashboard" || currentUrl === "/dashboard/home") {
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
    });
  }

  async initializeApp() {
    // Wait for the platform to be ready before hiding splash and checking token
    await this.platform.ready();

    /* To make sure we provide the fastest app loading experience
       for our users, hide the splash screen automatically
       when the app is ready to be used:

        https://capacitor.ionicframework.com/docs/apis/splash-screen#hiding-the-splash-screen
    */
    SplashScreen.hide();

    // Check for access token in storage. If present, redirect to dashboard home
    try {
      this.access_token = await this.appPreference.getAccessToken();
      this.isPinEnabled = await this.appPreference.isPinEnabled();
      this.isFingerprintEnabled =
        await this.appPreference.isFingerprintEnabled();
      console.log("Access Token in app component (init):", this.access_token);

      // normalize possible return types for the flags (boolean or string)
      const pinEnabled =
        this.isPinEnabled === true ||
        this.isPinEnabled === "true" ||
        this.isPinEnabled === 1 ||
        this.isPinEnabled === "1";
      const fingerprintEnabled =
        this.isFingerprintEnabled === true ||
        this.isFingerprintEnabled === "true" ||
        this.isFingerprintEnabled === 1 ||
        this.isFingerprintEnabled === "1";

      // If access token exists and neither PIN nor fingerprint lock is enabled,
      // navigate directly to dashboard. If either lock is enabled, continue
      // with the normal flow (e.g. show PIN/fingerprint screen or login flow).
      if (
        this.access_token !== "" &&
        this.access_token !== undefined &&
        this.access_token !== null &&
        !pinEnabled &&
        !fingerprintEnabled
      ) {
        // navigate to dashboard home and replace the current history entry
        // Use a small delay to ensure smooth transition
        setTimeout(() => {
          this.router.navigate(["/dashboard/home"], { replaceUrl: true });
        }, 100);
      }
    } catch (err) {
      console.error("Error reading access token during initializeApp()", err);
    } finally {
      // Add a longer delay before hiding the loading overlay to prevent flash
      // This ensures the redirect happens before the loading overlay disappears
      setTimeout(() => {
        this.isInitializing = false;
      }, 800); // Increased to 800ms for smoother transition
    }
  }
}
