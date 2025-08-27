import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-help-and-support",
  templateUrl: "./help-and-support.component.html",
  styleUrls: ["./help-and-support.component.scss"],
})
export class HelpAndSupportComponent {
  constructor(private route: ActivatedRoute) {
    // Set current date in ISO format (YYYY-MM-DD)
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed help and support");
    });
  }
}
