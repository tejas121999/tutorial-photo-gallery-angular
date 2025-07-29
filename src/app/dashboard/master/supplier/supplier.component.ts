import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-supplier",
  templateUrl: "./supplier.component.html",
  styleUrls: ["./supplier.component.scss"],
})
export class SupplierComponent {
  supplierForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.supplierForm = this.fb.group({
      supplierName: ["", Validators.required],
      alias: ["", Validators.required],
      billwiseBalance: [""],
      creditLimit: [""],
      name: [""],
      mobile: [""],
      address: [""],
      state: [""],
      country: [""],
      pincode: [""],
      pan: [""],
      registrationType: ["", Validators.required],
      gstin: ["", Validators.required],
      bankDetails: [""],
      openingBalance: [""],
    });
  }
  goBack() {
    // Logic to navigate back to the previous page
    // This could be a router navigation or any other method based on your app's routing setup
    
  }
}
