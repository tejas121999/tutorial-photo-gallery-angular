import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";
import { HostListener } from "@angular/core";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {
  // Popover state for purchase data type selector
  showDataTypePopover = false;
  popoverEvent: any = null;
  popoverStyles: any = {};
  popoverTriggerEl: HTMLElement | null = null;
  pageSize = 15;
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

  // Close popover when clicking anywhere outside
  @HostListener("document:click", ["$event"])
  handleDocumentClick(ev: Event) {
    if (!this.showDataTypePopover) return;
    // if the click target is inside the popover or the trigger, do nothing
    const target = ev.target as HTMLElement;
    const pop = document.querySelector(".custom-popover");
    const trigger =
      this.popoverTriggerEl ||
      document.querySelector(".purchase-dataType-outer");
    if (pop && pop.contains(target)) return;
    if (trigger && trigger.contains(target)) return;
    this.onPopoverDismiss();
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

  // Open the small popover when user clicks the purchase-dataType-outer div
  openDataTypePopover(event: Event) {
    // Prevent the document click listener from closing the popover immediately
    event.stopPropagation();

    const evAny: any = event;
    // Find the trigger element (closest .purchase-dataType-outer)
    let triggerEl: HTMLElement | null = null;
    if (evAny.currentTarget && evAny.currentTarget instanceof HTMLElement) {
      triggerEl = evAny.currentTarget as HTMLElement;
    } else if (evAny.target && evAny.target instanceof HTMLElement) {
      triggerEl = (evAny.target as HTMLElement).closest(
        ".purchase-dataType-outer"
      ) as HTMLElement;
    }

    // Toggle: if clicking same trigger while popover open, close it
    if (this.showDataTypePopover && this.popoverTriggerEl === triggerEl) {
      this.onPopoverDismiss();
      return;
    }

    this.popoverTriggerEl = triggerEl;

    // compute position based on trigger rect if available
    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;
    if (triggerEl) {
      const r = triggerEl.getBoundingClientRect();
      clientX = r.left + r.width / 2;
      clientY = r.bottom;
    } else if (evAny.touches && evAny.touches.length) {
      clientX = evAny.touches[0].clientX;
      clientY = evAny.touches[0].clientY;
    } else if (evAny.clientX !== undefined) {
      clientX = evAny.clientX;
      clientY = evAny.clientY;
    }

    // constrain horizontal position so popup stays on screen
    const left = Math.max(8, Math.min(clientX, window.innerWidth - 8));

    this.popoverStyles = {
      left: `${left}px`,
      top: `${clientY}px`,
      transform: "translate(-50%, 8px)",
    };
    this.showDataTypePopover = true;
  }

  onPopoverDismiss() {
    this.showDataTypePopover = false;
    this.popoverEvent = null;
    this.popoverStyles = {};
    this.popoverTriggerEl = null;
  }

  // Handle selection from popover; implement simple ordering/filtering behavior
  selectDataType(type: string) {
    // Close popover first
    this.onPopoverDismiss();
    // Simple behaviors: Latest = sort by created desc, Oldest = asc, Most Active = original order
    if (type === "Latest") {
      this.results = [...this.results].sort(
        (a: any, b: any) =>
          new Date(b.ledger_created).getTime() -
          new Date(a.ledger_created).getTime()
      );
    } else if (type === "Oldest") {
      this.results = [...this.results].sort(
        (a: any, b: any) =>
          new Date(a.ledger_created).getTime() -
          new Date(b.ledger_created).getTime()
      );
    } else if (type === "Most Active") {
      // For now, just reset to original results ordering
      this.results = [...this.data];
    }
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
        object_flag_tpd_id: 0,
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
