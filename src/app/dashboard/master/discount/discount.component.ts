import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-discount",
  templateUrl: "./discount.component.html",
  styleUrls: ["./discount.component.scss"],
})
export class DiscountComponent {
  discountForm: FormGroup;

  // Additional Details properties
  checkBox1: boolean = false;
  checkBox2: boolean = false;
  showAdditionalDetails: boolean = false;
  maintainInBatches: boolean = false;
  trackDateOfManufacture: boolean = false;
  useExpiryDates: boolean = false;
  enableCostTracking: boolean = false;
  isInclusiveOfDutiesAndTaxes: boolean = false;

  constructor(private fb: FormBuilder) {
    this.discountForm = this.fb.group({
      name: ["", Validators.required],
      alias: ["", Validators.required],
      under: ["", Validators.required],
      billwiseBalance: ["", Validators.required],
      affectOnInventory: ["", Validators.required],
      typeOfLedger: ["", Validators.required],
      GSTApplicant: ["", Validators.required],
      openingBalance: ["", Validators.required],
      creditPeriod: [""],
      roundingMethod: ["", Validators.required],
      roundingLimit: ["", Validators.required],
      GSTRateDetails: ["", Validators.required],
      taxabilityType: ["", Validators.required],
      natureOfTransaction: ["", Validators.required],
      gstRate: ["", Validators.required],
      cessValuation: ["", Validators.required],
      cessRate: ["", Validators.required],
      cessRateValue: ["", Validators.required],
      cessRateUnit: ["", Validators.required],
      typeOfSupply: ["", Validators.required],
    });
  }
}
