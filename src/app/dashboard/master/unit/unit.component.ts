import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-unit",
  templateUrl: "./unit.component.html",
  styleUrls: ["./unit.component.scss"],
})
export class UnitComponent {
  unitForm: FormGroup;
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

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
    });
  }

  async initializeData() {
    this.unitForm = this.fb.group({
      unit_type: ["", Validators.required],
      symbol: [""],
      unit_quantity_code: [""],
      decimal_number: [""],
    });
  }

  payload: any = [
    {
      login_token: null,
      branch_token: null,
      object_flag_tpd_id: null,
      tpd_status_tally_entity_type: null,
      tpd_status_data: null,
      tpd_status_report_id: null,
      tpd_status_report_data: null,
      unit_simple_data: [
        {
          unit_symbol: null,
          formal_name: null,
          unit_qty_code: null,
          num_of_decimal_palce: null,
        },
      ],
    },
  ];

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
    this.payload[0].unit_simple_data[0].unit_symbol =
      this.unitForm.get("unit_type")?.value;
    this.payload[0].unit_simple_data[0].formal_name =
      this.unitForm.get("symbol")?.value;
    this.payload[0].unit_simple_data[0].unit_qty_code =
      this.unitForm.get("unit_quantity_code")?.value;
    this.payload[0].unit_simple_data[0].num_of_decimal_palce =
      this.unitForm.get("decimal_number")?.value;
  }

  addUnit() {
    this.isLoading = true;
    if (this.unitForm.get("unit_type")?.value) {
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      console.log("Payload:", this.payload);
      this.apiService.addUnitSimpleData(this.payload).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response?._Object?.length !== 0) {
            this.router.navigate(["/dashboard/master/unit-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          } else {
            console.error("Error adding unit:", response.message);
          }
        },
        (error) => {
          this.isLoading = false;
          console.error("API Error:", error);
        }
      );
    } else {
      this.isLoading = false;
      this.unitForm.markAllAsTouched();
    }
  }
}
