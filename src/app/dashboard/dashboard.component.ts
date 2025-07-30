import { Component, ViewChild, AfterViewInit, ElementRef } from "@angular/core";
import { IonMenu } from "@ionic/angular";
import { register } from "swiper/element/bundle";

register();
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements AfterViewInit {
  showMaster = false;
  @ViewChild(IonMenu) menu: IonMenu;
  @ViewChild("dashboardMain", { static: true }) dashboardMain: ElementRef;

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
}
