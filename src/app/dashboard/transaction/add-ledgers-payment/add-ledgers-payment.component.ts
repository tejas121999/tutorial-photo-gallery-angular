import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { DataSharingService } from "src/app/services/data-sharing.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-add-ledgers-payment",
  templateUrl: "./add-ledgers-payment.component.html",
  styleUrls: ["./add-ledgers-payment.component.scss"],
})
export class AddLedgersPaymentComponent implements OnInit {
  branch_token: any;
  login_token: any;
  paymentLedgerForm: FormGroup;

  paymentType: any = [
    { id: "dr", name: "Debit" },
    { id: "cr", name: "Card" },
  ];

  ledgerType: any = [
    { id: "sales", name: "Sales" },
    { id: "purchase", name: "Purchase" },
  ];

  constructor(
    private fb: FormBuilder,
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService
  ) {
    this.initializeData();
  }

  async initializeData() {
    this.paymentLedgerForm = this.fb.group({
      debit_credit: [""],
      ledger_type: [""],
      amount: [""],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
    });
  }

  sendData() {
    this.dataSharingService.changeLagerPaymentData(
      this.paymentLedgerForm.value
    );
    this.router.navigate(["/dashboard/transaction/payment"], {
      queryParams: { reload: new Date().getTime() },
    });
  }
}
