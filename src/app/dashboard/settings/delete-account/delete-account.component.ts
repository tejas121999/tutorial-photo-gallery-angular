import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-delete-account",
  templateUrl: "./delete-account.component.html",
  styleUrls: ["./delete-account.component.scss"],
})
export class DeleteAccountComponent {
  constructor(private route: ActivatedRoute) {
    // Set current date in ISO format (YYYY-MM-DD)
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed delete account");
    });
  }
}
