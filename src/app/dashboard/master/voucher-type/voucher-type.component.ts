import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-voucher-type",
  templateUrl: "./voucher-type.component.html",
  styleUrls: ["./voucher-type.component.scss"],
})
export class VoucherTypeComponent {
  voucherTypeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.voucherTypeForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      alias: ["", [Validators.required, Validators.minLength(3)]],
      voucherType: ["", Validators.required],
      abbreviation: ["", [Validators.required, Validators.minLength(2)]],
      activeVoucher: ["Yes", Validators.required],
      voucherNumberingMethod: [""],
      preventingDuplicateVoucherCreation: ["Yes", Validators.required],
      additionalNumberingDetails: [""],
      numberingBehavior: ["", Validators.required],
      retainOriginalVoucherNo: ["", Validators.required],
    });
  }
}
