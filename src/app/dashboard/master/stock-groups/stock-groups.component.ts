import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-stock-groups",
  templateUrl: "./stock-groups.component.html",
  styleUrls: ["./stock-groups.component.scss"],
})
export class StockGroupsComponent {
  stockGroupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.stockGroupForm = this.fb.group({
      stockGroupName: ["", Validators.required],
      alias: ["", Validators.required],
      under: ["", Validators.required],
      HSNDetails: ["", Validators.required],
      HSN: [""],
      description: [""],
      GSTDetails: ["", Validators.required],
      taxabilityType: ["", Validators.required],
      GSTRate: ["", Validators.required],
      cessValuation: ["", Validators.required],
      cessRate: ["", Validators.required],
      cessRateValue: ["", Validators.required],
      cessRateUnit: ["", Validators.required],
    });
  }
}
