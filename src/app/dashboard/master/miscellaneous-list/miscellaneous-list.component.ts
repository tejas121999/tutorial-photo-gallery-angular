import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-miscellaneous-list",
  templateUrl: "./miscellaneous-list.component.html",
  styleUrls: ["./miscellaneous-list.component.scss"],
})
export class MiscellaneousListComponent implements OnInit {
  pageSize = 15;
  currentPage = 1;
  showSearchbar = false;
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
  currentDate: string;
  public data = [
    "Amsterdam",
    "Buenos Aires",
    "Cairo",
    "Geneva",
    "Hong Kong",
    "Istanbul",
    "London",
    "Madrid",
    "New York",
    "Panama City",
  ];
  public results = [...this.data];

  constructor() {
    // Set current date in ISO format (YYYY-MM-DD)
    const today = new Date();
    this.currentDate = today.toISOString().split("T")[0];
  }

  ngOnInit() {}

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || "";
    this.results = this.data.filter((d) => d.toLowerCase().includes(query));
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
}
