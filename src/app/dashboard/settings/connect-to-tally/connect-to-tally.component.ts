import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-connect-to-tally",
  templateUrl: "./connect-to-tally.component.html",
  styleUrls: ["./connect-to-tally.component.scss"],
})
export class ConnectToTallyComponent {
  constructor(private route: ActivatedRoute) {
    // Set current date in ISO format (YYYY-MM-DD)
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed connect to tally");
    });
  }
}
