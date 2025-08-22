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
  pageSize = 10;
  currentPage = 1;
  currentYear: number;
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  showSearchbar = false;
  public data = [];
  public results = [...this.data];

  constructor(
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private route: ActivatedRoute
  ) {
    // Set current year
    const today = new Date();
    this.currentYear = today.getFullYear();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
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
    this.currentYear = new Date(event.detail.value).getFullYear();
    console.log("Selected year:", this.currentYear);
    this.filterByYear();
  }

  filterByYear() {
    if (!this.currentYear) {
      this.results = [...this.data];
      return;
    }
    this.results = this.data.filter((item: any) => {
      if (!item?.ledger_created) return false;
      const itemYear = new Date(item.ledger_created).getFullYear();
      return itemYear === this.currentYear;
    });
  }

  changeYear(direction: number) {
    // direction: -1 for previous, 1 for next
    this.currentYear += direction;
    this.filterByYear();
  }

  // Add a trackBy function for ngFor
  trackResult(index: number, item: any) {
    return item;
  }

  async getCustomerList() {
    this.isLoading = true;
    var body = [
      {
        login_token: this.login_token,
        branch_token: this.branch_token,
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
          this.filterByYear();
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