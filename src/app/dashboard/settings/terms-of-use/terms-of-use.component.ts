import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-terms-of-use",
  templateUrl: "./terms-of-use.component.html",
  styleUrls: ["./terms-of-use.component.scss"],
})
export class TermsOfUseComponent {
  constructor(private route: ActivatedRoute) {
    // Set current date in ISO format (YYYY-MM-DD)
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed terms of use");
    });
  }
}
