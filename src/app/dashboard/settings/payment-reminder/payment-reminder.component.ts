import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-payment-reminder",
  templateUrl: "./payment-reminder.component.html",
  styleUrls: ["./payment-reminder.component.scss"],
})
export class PaymentReminderComponent {
  constructor(private route: ActivatedRoute) {
    // Set current date in ISO format (YYYY-MM-DD)
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed payment reminder");
    });
  }
}
