import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-my-companies",
  templateUrl: "./my-companies.component.html",
  styleUrls: ["./my-companies.component.scss"],
})
export class MyCompaniesComponent implements OnInit {
  showSearchbar = false;
  public data = [];
  public results = [...this.data];
  pageSize = 15;
  currentPage = 1;
  branch_token: any;
  login_token: any;
  user_name: string = "";

  constructor(
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("_BranchList");
      this.login_token = await this.appPreference.get("_LoginToken");
      this.user_name = await this.appPreference.get("_UserDetail");
      console.log("branch_token", this.branch_token);
    });
  }

  get totalPages() {
    return Math.ceil(this.results.length / this.pageSize) || 1;
  }

  get pagedResults() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.results.slice(start, start + this.pageSize);
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || "";
    this.results = this.data.filter((item: any) => {
      if (!item?.costcenter_name) return false;
      return item?.costcenter_name.toLowerCase().includes(query);
    });
  }

  async switchCompany(branch_token_id: any, branch_name: any) {
    console.log("Switching company to:", branch_token_id, branch_name);
    await this.appPreference.remove("branch_token_id");
    console.log("remove", await this.appPreference.get("branch_token_id"));

    await this.appPreference
      .set("branch_token_id", branch_token_id)
      .then(async () => {
        await this.appPreference.set("branch_name", branch_name).then(() => {
          this.router.navigate(["/dashboard"]);
        });
      });
    console.log("new", await this.appPreference.get("branch_token_id"));
  }
}
