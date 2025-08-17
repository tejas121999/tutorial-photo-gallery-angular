import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { DataSharingService } from "src/app/services/data-sharing.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  paymentForm: FormGroup;
  addedLagers: any = [];
  constructor(
    private fb: FormBuilder,
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService
  ) {
    this.paymentForm = this.fb.group({
      changeMode: [""],
      purchaseNo: [""],
      supplierInvoiceNo: [""],
      date: [""],
      billDate: [""],
      narration: [""],
      total_credit: [""],
      total_debit: [""],
    });

    this.dataSharingService?.currentLagerPaymentData.subscribe((data: any) => {
      console.log("Selected Ledgers:", data);
      if (data.length !== 0) {
        console.log("Selected Ledgers2:", data);
        this.addedLagers.push(data);
      }

      console.log(this.addedLagers);
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
    });
  }
}
