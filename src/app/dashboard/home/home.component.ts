import { Component, OnInit } from "@angular/core";
import { AppPreference } from "../../shared/app-preference";
@Component({
  selector: "app-dashboard-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  email: string = "";
  password: string = "";
  branch_token: any;
  constructor(private appPreference: AppPreference) {}

  async ngOnInit() {
    console.log(
      "await this.appPreference.getPin()",
      await this.appPreference.getPin()
    );
    console.log("_LoginToken", await this.appPreference.get("_LoginToken"));
    console.log("_BranchList", await this.appPreference.get("_BranchList"));
    console.log(
      "branch_token",
      await this.appPreference.get("branch_token_id")
    );
  }
}
