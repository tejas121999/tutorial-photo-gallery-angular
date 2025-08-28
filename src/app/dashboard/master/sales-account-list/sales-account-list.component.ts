import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-sales-account-list",
  templateUrl: "./sales-account-list.component.html",
  styleUrls: ["./sales-account-list.component.scss"],
})
export class SalesAccountListComponent implements OnInit {
  branch_token: any;
  showSearchbar = false;
  pageSize = 15;
  currentPage = 1;
  currentDate: string;
  public data = [];
  public results = [...this.data];

  constructor(
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private route: ActivatedRoute
  ) {
    // Set current date in ISO format (YYYY-MM-DD)
    this.initializeData();
  }

  async initializeData() {
    // Set current date in ISO format (YYYY-MM-DD)
    const today = new Date();
    this.currentDate = today.toISOString().split("T")[0];
    this.branch_token = await this.appPreference.get("branch_token_id");
  }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      this.getSalesList();
    });
    this.getSalesList();
  }

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

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || "";
    this.results = this.data.filter((item: any) => {
      if (!item?.ledger_name) return false;
      return item?.ledger_name.toLowerCase().includes(query);
    });
  }

  // Filter data by ledger_created date
  onDateChange(event: any) {
    this.currentDate = event.detail.value.substring(0, 10);
    console.log("Selected date:", this.currentDate);
    this.filterByDate();
  }

  filterByDate() {
    if (!this.currentDate) {
      this.results = [...this.data];
      return;
    }
    // Always extract the first 10 characters (YYYY-MM-DD) for comparison
    const selectedDate = this.currentDate.substring(0, 10);
    this.results = this.data.filter((item: any) => {
      if (!item?.ledger_created) return false;
      const itemDate = item?.ledger_created.substring(0, 10);
      return itemDate === selectedDate;
    });
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

  async getSalesList() {
    var temp = [
      {
        login_token: await this.appPreference.get("_LoginToken"),
        branch_token: this.branch_token,
        object_flag_tpd_id: 0,
      },
    ];
    console.log("temp", temp);
    this.apiService.getSalesList(temp).subscribe(
      (response: any) => {
        this.data = response?._Object || [];
        this.results = [...this.data];
        // this.filterByDate();
      },
      (error: any) => {
        console.error("Error fetching sales list:", error);
      }
    );
  }
}
