import { Component } from "@angular/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { Platform } from "@ionic/angular";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private platform: Platform, private router: Router) {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        alert("Back button pressed");
        this.router.navigate(["/dashboard/home"], { replaceUrl: true }); // navigates and clears history
      });
    });
    this.initializeApp();
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
