import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// Make sure to import FormsModule in your module for ngModel to work

@Component({
  selector: "app-stock-item",
  templateUrl: "./stock-item.component.html",
  styleUrls: ["./stock-item.component.scss"],
})
export class StockItemComponent {
  setComponentsBOM: boolean = false;
  setMRPDetails: boolean = false;
  rateOfDuty: boolean = false;
  setStandardRates: boolean = false;
  stockItemForm: FormGroup;
  additionalDetailsForm: FormGroup;
  showAdditionalDetails: boolean = false;
  checkboxes: any

  constructor(private fb: FormBuilder) {
    this.stockItemForm = this.fb.group({
      name: ["", Validators.required],
      under: [""],
      category: ["", Validators.required],
      unit: ["", Validators.required],
      alternateUnit: [""],
      gstApplicable: ["", Validators.required],
      HSNDetails: [""],
      hsn: [""],
      description: [""],
      gstRateDetails: ["", Validators.required],
      taxabilityType: [""],
      supplyType: ["", Validators.required],
      gstRate: [""],
      cessValuation: ["", Validators.required],
      cessRate: [""],
      cessRateValue: ["", Validators.required],
      cessRateUnit: ["", Validators.required],
      openingBalance: [""],
      quantity: [""],
      rate: [""],
      value: [""],
    });
    this.additionalDetailsForm = this.fb.group({

    });
  }
}
