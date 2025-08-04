import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {
  pageSize = 5;
  currentPage = 1;
  currentDate: string;
  isLoading: boolean = false;
  showSearchbar = false;
  public data = [];
  public results = [...this.data];

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
    this.route.queryParams.subscribe(() => {
      this.getCustomerList();
    });
    this.getCustomerList();
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

  onDateChange(event: any) {
    this.currentDate = event.detail.value;
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

  async getCustomerList() {
    this.isLoading = true;
    var body = [
      {
        login_token: await this.appPreference.get("_LoginToken"),
        branch_token: (await this.appPreference.get("_BranchList"))[0]
          .branch_token_id,
        object_flag_tpd_id: 1,
        page_number: 0,
        page_size: 0,
      },
    ];
    this.apiService.getCustomerList(body).subscribe(
      (response: any) => {
        if (response && response._Object && response?._Object?.length > 0) {
          this.data = response._Object;
          this.results = [...this.data];
          this.filterByDate();
        } else {
          this.data = [];
          this.results = [];
        }
      },
      (error) => {
        console.error("Error fetching customer list:", error);
        this.isLoading = false;
      }
    );
  }
}
