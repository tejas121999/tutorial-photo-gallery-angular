import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-cost-center",
  templateUrl: "./cost-center.component.html",
  styleUrls: ["./cost-center.component.scss"],
})
export class CostCenterComponent {
  costCenterForm: FormGroup;

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
    this.costCenterForm = this.fb.group({
      costCenterName: ["", Validators.required],
      alias: ["", Validators.required],
      under: ["", Validators.required],
      emailId: [""],
      bankDetails: [""],
      crossUsing: [""],
      accountNumber: [""],
      ifscCode: [""],
      bankName: [""],
    });
  }
}
