import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-e-fund",
  templateUrl: "./e-fund.component.html",
  styleUrls: ["./e-fund.component.scss"],
})
export class EFundComponent implements OnInit {
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  e_fundForm: FormGroup;
  banks: string[] = [
    "Allahabad Bank",
    "Andhra Bank",
    "Axis Bank",
    "Bank of Bahrain and Kuwait",
    "Bank of Baroda - Corporate Banking",
    "Bank of Baroda - Retail Banking",
    "Bank of India",
    "Bank of Maharashtra",
    "Canara Bank",
    "Central Bank of India",
    "City Union Bank",
    "Corporation Bank",
    "Deutsche Bank",
    "Development Credit Bank",
    "Dhanlaxmi Bank",
    "Federal Bank",
    "ICICI Bank",
    "IDBI Bank",
    "Indian Bank",
    "Indian Overseas Bank",
    "IndusInd Bank",
    "ING Vysya Bank",
    "Jammu and Kashmir Bank",
    "Karnataka Bank Ltd",
    "Karur Vysya Bank",
    "Kotak Bank",
    "Laxmi Vilas Bank",
    "Oriental Bank of Commerce",
    "Punjab National Bank - Corporate Banking",
    "Punjab National Bank - Retail Banking",
    "Punjab & Sind Bank",
    "Shamrao Vitthal Co-operative Bank",
    "South Indian Bank",
    "State Bank of Bikaner & Jaipur",
    "State Bank of Hyderabad",
    "State Bank of India",
    "State Bank of Mysore",
    "State Bank of Patiala",
    "State Bank of Travancore",
    "Syndicate Bank",
    "Tamilnad Mercantile Bank Ltd.",
    "UCO Bank",
    "Union Bank of India",
    "United Bank of India",
    "Vijaya Bank",
    "Yes Bank Ltd",
  ];
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
    this.e_fundForm = this.fb.group({
      name: ["", Validators.required],
      alias: [""],
      acNumber: [""],
      ifscCode: [""],
      bankName: [""],
      openingBalance: [""],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
    });
  }
}
