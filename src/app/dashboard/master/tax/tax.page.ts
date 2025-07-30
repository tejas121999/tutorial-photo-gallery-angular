import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-tax",
  templateUrl: "./tax.page.html",
  styleUrls: ["./tax.page.scss"],
})
export class TaxPage implements OnInit {
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

  ngOnInit() {
  
  }
}
