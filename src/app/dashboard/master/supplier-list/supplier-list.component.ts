import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-supplier-list",
  templateUrl: "./supplier-list.component.html",
  styleUrls: ["./supplier-list.component.scss"],
})
export class SupplierListComponent implements OnInit {
  pageSize = 10;
  currentPage = 1;
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  currentYear: number;
  public data = [];
  public results = [...this.data];
  showSearchbar = false;

  constructor(
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private route: ActivatedRoute
  ) {
    // Set current year
    const today = new Date();
    this.currentYear = today.getFullYear();
    console.log("Selected year:", this.currentYear);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      this.getSupplierList();
    });
    this.getSupplierList();
  }

  async initializeData() {
    this.branch_token = await this.appPreference.get("branch_token_id");
    this.login_token = await this.appPreference.get("_LoginToken");
    console.log("Branch Token:", this.branch_token);
  }

  // search bar code
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
  // Date filter code
  // Handle date change from date picker
  onDateChange(event: any) {
    this.currentYear = new Date(event.detail.value).getFullYear();
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

  // Fetch supplier list from API
  async getSupplierList() {
    this.isLoading = true;
    const body = [
      {
        login_token: await this.appPreference.get("_LoginToken"),
        branch_token: await this.appPreference.get("branch_token_id"),
        object_flag_tpd_id: 0,
        page_number: 0,
        page_size: 0,
      },
    ];
    this.apiService.getSupplierList(body).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response && response._Object && response._Object.length > 0) {
          this.data = response?._Object;
          this.results = [...this.data];
          this.filterByYear();
        } else {
          this.data = [];
          this.results = [];
        }
      },
      (error) => {
        console.error("Error fetching supplier list:", error);
        this.isLoading = false;
      }
    );
  }
}
 
