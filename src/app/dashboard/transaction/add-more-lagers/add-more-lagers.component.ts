import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { DataSharingService } from "src/app/services/data-sharing.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-add-more-lagers",
  templateUrl: "./add-more-lagers.component.html",
  styleUrls: ["./add-more-lagers.component.scss"],
})
export class AddMoreLagersComponent implements OnInit {
  pageSize = 15;
  currentPage = 1;
  showSearchbar = false;
  branch_token: any;
  login_token: any;
  currentDate: string;
  public data = [];
  public results = [...this.data];
  selectedItems: string[] = [];

  constructor(
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService
  ) {
    // Set current date in ISO format (YYYY-MM-DD)
    const today = new Date();
    this.currentDate = today.toISOString().split("T")[0];
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
      this.getLedgerList();
    });
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

  async getLedgerList() {
    const body = [
      {
        login_token: this.login_token,
        branch_token: this.branch_token,
        // use this in bill sendry
        object_flag_tpd_id: 0,
        include_tax_flag: 1,
        include_tds_flag: 1,
        include_tcs_flag: 1,
        include_gst_flag: 1,
        include_vat_flag: 1,
      },
    ];
    this.apiService.getLedgerList(body).subscribe(
      (response: any) => {
        this.data = response._Object;
        this.results = [...this.data];
        // this.filterByDate();
      },
      (error) => {
        console.error("Error fetching stock item list:", error);
      }
    );
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

  getLedgerData(item: string, isChecked: boolean) {
    if (isChecked) {
      if (!this.selectedItems.includes(item)) {
        this.selectedItems.push(item);
      }
    } else {
      const index = this.selectedItems.indexOf(item);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      }
    }

    console.log("Selected Items:", this.selectedItems);
  }

  sendData() {
    this.dataSharingService.changeLagersData(this.selectedItems);
    this.router.navigate(["/dashboard/transaction/purchase"], {
      queryParams: { reload: new Date().getTime() },
    });
  }
}
