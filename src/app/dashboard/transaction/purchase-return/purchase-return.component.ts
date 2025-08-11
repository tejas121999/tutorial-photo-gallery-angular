import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-purchase-return",
  templateUrl: "./purchase-return.component.html",
  styleUrls: ["./purchase-return.component.scss"],
})
export class PurchaseReturnComponent implements OnInit {
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  purchaseReturnForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeData();
  }

  async initializeData() {
    this.purchaseReturnForm = this.fb.group({
      name: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
    });
  }
}
