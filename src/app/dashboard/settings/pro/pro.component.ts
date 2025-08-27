import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-pro",
  templateUrl: "./pro.component.html",
  styleUrls: ["./pro.component.scss"],
})
export class ProComponent {
  constructor(private route: ActivatedRoute) {
    // Set current date in ISO format (YYYY-MM-DD)
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed pro");
    });
  }
}
