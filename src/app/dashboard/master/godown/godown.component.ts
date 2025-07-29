import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-godown",
  templateUrl: "./godown.component.html",
  styleUrls: ["./godown.component.scss"],
})
export class GodownComponent {
  godownForm: FormGroup;

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
    this.godownForm = this.fb.group({
      name: ["", Validators.required],
      alias: ["", Validators.required],
      under: ["", Validators.required],
      exciseTaxUnit: [""],
      address: [""],
      allowMaterialStorage: [""],
      setJobForJobPosting: [""],
    });
  }
}
