import { Component, OnInit } from "@angular/core";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-stock-item-list",
  templateUrl: "./stock-item-list.component.html",
  styleUrls: ["./stock-item-list.component.scss"],
})
export class StockItemListComponent implements OnInit {
  branch_token: any;
  login_token: any;
  pageSize = 15;
  currentPage = 1;
  currentDate: string;
  public data = [];
  public results = [...this.data];
  showSearchbar = false;
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
      this.getStockItemList();
    });
    this.getStockItemList();
    console.log("StockItemListComponent initialized");
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
      if (!item?.item_name) return false;
      return item?.item_name.toLowerCase().includes(query);
    });
  }

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
      if (!item?.created_date) return false;
      const itemDate = item?.created_date.substring(0, 10);
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

  async getStockItemList() {
    const body = [
      {
        login_token: await this.appPreference.get("_LoginToken"),
        branch_token: await this.appPreference.get("branch_token_id"),
        object_flag_tpd_id: 0,
        page_number: 0,
        page_size: 0,
      },
    ];
    this.apiService.getItemList(body).subscribe(
      (response: any) => {
        this.data = response?._Object || [];
        this.results = [...this.data];
        // this.filterByDate();
      },
      (error) => {
        console.error("Error fetching stock item list:", error);
      }
    );
  }
}
