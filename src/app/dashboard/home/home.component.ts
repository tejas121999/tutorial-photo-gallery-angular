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
    this.branch_token = (
      await this.appPreference.get("_BranchList")
    )[0].branch_token_id;
    console.log("ACCESS_TOKEN", await this.appPreference.get("ACCESS_TOKEN"));
    console.log("_LoginToken", await this.appPreference.get("_LoginToken"));
    console.log("_BranchList", await this.appPreference.get("_BranchList"));
    console.log("branch_token", this.branch_token);
  }
}
