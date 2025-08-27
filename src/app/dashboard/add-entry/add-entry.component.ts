import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-add-entry",
  templateUrl: "./add-entry.component.html",
  styleUrls: ["./add-entry.component.scss"],
})
export class AddEntryComponent implements OnInit {
  pageSize = 10;
  currentPage = 1;
  showSearchbar = false;
  selectedTab: string = "sales";

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
  get formattedDate(): string {
    const [year, month, day] = this.currentDate.split("-");
    return `${day}-${month}-${year}`;
  }
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

  constructor(private route: ActivatedRoute) {
    // Set current date in ISO format (YYYY-MM-DD)
    const today = new Date();
    this.currentDate = today.toISOString().split("T")[0];
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed add entry");
    });
  }

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
