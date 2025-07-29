import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-tax",
  templateUrl: "./tax.page.html",
  styleUrls: ["./tax.page.scss"],
})
export class TaxPage {
  taxForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taxForm = this.fb.group({
      taxName: ["", Validators.required],
      alias: ["", Validators.required],
      typeOfTax: ["", Validators.required],
      typeTax: ["", Validators.required],
      valuationType: ["", Validators.required],
      percentage: ["", Validators.required],
      roundingMethod: ["", Validators.required],
      roundingLimit: ["", Validators.required],
      name: [""],
      address: [""],
      mobile: [""],
      pan: [""],
      bankDetails: [""],
      openingBalance: [""],
      chequeNumber: [""],
      accountNumber: [""],
      ifscCode: [""],
      bankName: [""],
    });
  }

  goBack() {
    // Logic to navigate back to the previous page
    // This could be a router navigation or a service call depending on your routing setup
    window.history.back(); // Simple way to go back in history
  }
}
