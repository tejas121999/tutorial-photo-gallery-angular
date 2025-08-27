import { Component, OnInit } from "@angular/core";
import { AppPreference } from "../../shared/app-preference";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-dashboard-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  email: string = "";
  password: string = "";
  branch_token: any;
  constructor(
    private appPreference: AppPreference,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed home");
    });
  }
}
