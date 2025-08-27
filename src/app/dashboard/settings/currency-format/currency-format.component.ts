import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-currency-format",
  templateUrl: "./currency-format.component.html",
  styleUrls: ["./currency-format.component.scss"],
})
export class CurrencyFormatComponent {
  constructor(private route: ActivatedRoute) {
    // Set current date in ISO format (YYYY-MM-DD)
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed currency format");
    });
  }
}
