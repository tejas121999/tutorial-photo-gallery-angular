import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-themes",
  templateUrl: "./themes.component.html",
  styleUrls: ["./themes.component.scss"],
})
export class ThemesComponent {
  constructor(private route: ActivatedRoute) {
    // Set current date in ISO format (YYYY-MM-DD)
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed delete account");
    });
  }
  selectedTheme: string | null = null;

  onThemeChange(value: string) {
    this.selectedTheme = value;
    // Set Ionic primary color and header background
    document.documentElement.style.setProperty("--ion-color-primary", value);
    document.documentElement.style.setProperty(
      "--ion-color-primary-rgb",
      this.hexToRgb(value)
    );
    document.documentElement.style.setProperty("--background", value);
    // You can add more variables for sidebar/menu/icon as needed
  }

  // Helper to convert hex to rgb string
  hexToRgb(hex: string): string {
    let c = hex.replace("#", "");
    if (c.length === 3)
      c = c
        .split("")
        .map((x) => x + x)
        .join("");
    const num = parseInt(c, 16);
    return `${(num >> 16) & 255},${(num >> 8) & 255},${num & 255}`;
  }
}
