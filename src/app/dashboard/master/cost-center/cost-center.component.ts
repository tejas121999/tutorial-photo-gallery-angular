import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-cost-center",
  templateUrl: "./cost-center.component.html",
  styleUrls: ["./cost-center.component.scss"],
})
export class CostCenterComponent {
  costCenterForm: FormGroup;

  // Additional Details properties
  checkBox1: boolean = false;
  checkBox2: boolean = false;
  showAdditionalDetails: boolean = false;
  maintainInBatches: boolean = false;
  trackDateOfManufacture: boolean = false;
  useExpiryDates: boolean = false;
  enableCostTracking: boolean = false;
  isInclusiveOfDutiesAndTaxes: boolean = false;
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;

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
    this.costCenterForm = this.fb.group({
      costCenterName: ["", Validators.required],
      alias: [""],
      under: [""],
      emailId: [""],
      bankDetails: [""],
      crossUsing: [""],
      accountNumber: [""],
      ifscCode: [""],
      bankName: [""],
      useForJobCosting: [false],
      showOpeningBalance: [false],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
    });
    // this.getTaxList();
    console.log("hello tax page");
  }
  payload: any[] = [
    {
      login_token: null,
      branch_token: null,
      object_flag_tpd_id: null,
      tpd_status_tally_entity_type: null,
      tpd_status_data: null,
      tpd_status_report_id: null,
      tpd_status_report_data: null,
      costcenter_data: [
        {
          costcenter_name: null,
          alias: null,
          under: null,
        },
        {
          costcenter_name: null,
          alias: null,
          under: null,
        },
      ],
    },
  ];

  // Recursively set all values in an object/array to null
  resetPayloadValuesToNull(obj: any) {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i] === "object" && obj[i] !== null) {
          this.resetPayloadValuesToNull(obj[i]);
        } else {
          obj[i] = "";
        }
      }
    } else if (typeof obj === "object" && obj !== null) {
      for (const key of Object.keys(obj)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          this.resetPayloadValuesToNull(obj[key]);
        } else {
          obj[key] = "";
        }
      }
    }
  }

  createPayload() {
    this.payload[0].login_token = this.login_token;
    this.payload[0].branch_token = this.branch_token;
    this.payload[0].object_flag_tpd_id = "1";
    this.payload[0].tpd_status_tally_entity_type = "Test";
    this.payload[0].tpd_status_data = "text";
    this.payload[0].tpd_status_report_id = 0;
    this.payload[0].tpd_status_report_data = "";
    this.payload[0].costcenter_data[0].costcenter_name =
      this.costCenterForm.get("costCenterName")?.value;
    this.payload[0].costcenter_data[0].alias =
      this.costCenterForm.get("alias")?.value;
    this.payload[0].costcenter_data[0].under =
      this.costCenterForm.get("under")?.value;
  }

  addCostCenter() {
    this.isLoading = true;
    if (this.costCenterForm.get("costCenterName")?.value) {
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      // Call your API service to add the cost center
      this.apiService.addCostCenterData(this.payload).subscribe(
        (response) => {
          this.isLoading = false;
          // Handle success response
          this.router.navigate(["/dashboard/master/stock-group-list"], {
            queryParams: { reload: new Date().getTime() },
          });
          this.costCenterForm.reset();
        },
        (error) => {
          this.isLoading = false;
          // Handle error response
        }
      );
    } else {
      this.isLoading = false;
      this.costCenterForm.markAllAsTouched();
    }
  }
}
