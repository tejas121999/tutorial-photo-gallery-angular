import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-cash-list",
  templateUrl: "./cash-list.component.html",
  styleUrls: ["./cash-list.component.scss"],
})
export class CashListComponent implements OnInit {
  pageSize = 15;
  currentPage = 1;
  branch_token: any;
  login_token: any;
  showSearchbar = false;
  currentDate: string;
  public data = [];
  public results = [...this.data];

  get totalPages() {
    return Math.ceil(this.results.length / this.pageSize) || 1;
  }

  get pagedResults() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.results.slice(start, start + this.pageSize);
  }

  changePage(direction: number) {
    const nextPage = this.currentPage + direction;
    if (nextPage >= 1 && nextPage <= this.totalPages) {
      this.currentPage = nextPage;
    }
  }
  deleteItem(item: string) {
    this.results = this.results.filter((result) => result !== item);
  }

  constructor(
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private route: ActivatedRoute
  ) {
    // Set current date in ISO format (YYYY-MM-DD)
    const today = new Date();
    this.currentDate = today.toISOString().split("T")[0];
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
      this.getCashList();
    });
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || "";
    this.results = this.data.filter((item: any) => {
      if (!item?.ledger_name) return false;
      return item?.ledger_name.toLowerCase().includes(query);
    });
  }

  closeSearchbar() {
    this.showSearchbar = false;
    this.getCashList();
  }

  onDateChange(event: any) {
    this.currentDate = event.detail.value;
  }

  changeDate(direction: number) {
    // direction: -1 for previous, 1 for next
    const current = new Date(this.currentDate);
    current.setDate(current.getDate() + direction);
    this.currentDate = current.toISOString().split("T")[0];
  }

  // Add a trackBy function for ngFor
  trackResult(index: number, item: any) {
    return item;
  }

  getCashList() {
    var temp = [
      {
        login_token: this.login_token,
        branch_token: this.branch_token,
        object_flag_tpd_id: 0,
        page_number: 0,
        page_size: 0,
      },
    ];

    this.apiService.getCashList(temp).subscribe(
      (response: any) => {
        if (response?._Object) {
          console.log("Cash List:", response._Object);
          this.data = response?._Object;
          this.results = [...this.data];
        } else {
          console.error("Invalid response format:", response);
        }
      },
      (error: any) => {
        console.error("Error fetching cash list:", error);
      }
    );
  }
}
