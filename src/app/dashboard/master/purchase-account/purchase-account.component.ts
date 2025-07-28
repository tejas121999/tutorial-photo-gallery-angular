import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-purchase-account",
  templateUrl: "./purchase-account.component.html",
  styleUrls: ["./purchase-account.component.scss"],
})
export class PurchaseAccountComponent {
  ngOnInit() {
    this.purchaseAccountForm
      .get("HSNDetails")
      ?.valueChanges.subscribe((value) => {
        console.log("HSNDetails changed:", value);
      });
  }
  purchaseAccountForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.purchaseAccountForm = this.fb.group({
      purchaseName: ["", Validators.required],
      alias: ["", Validators.required],
      ledgerType: ["", Validators.required],
      gstApplicable: ["", Validators.required],
      HSNDetails: ["", Validators.required],
      hsn: ["", Validators.required],
      gstRateDetails: ["", Validators.required],
      description: [""],
      taxabilityType: ["", Validators.required],
      supplyType: [""],
      name: [""],
      mobile: [""],
      address: [""],
      pan: [""],
      bankDetails: [""],
      openingBalance: [""],
    });
  }
}
