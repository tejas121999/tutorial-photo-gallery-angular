import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-godown",
  templateUrl: "./godown.component.html",
  styleUrls: ["./godown.component.scss"],
})
export class GodownComponent {
  godownForm: FormGroup;
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  // Additional Details properties
  checkBox1: boolean = false;
  checkBox2: boolean = false;
  showAdditionalDetails: boolean = false;
  maintainInBatches: boolean = false;
  trackDateOfManufacture: boolean = false;
  useExpiryDates: boolean = false;
  enableCostTracking: boolean = false;
  isInclusiveOfDutiesAndTaxes: boolean = false;

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
    this.godownForm = this.fb.group({
      name: ["", Validators.required],
      alias: [""],
      under: [""],
      exciseTaxUnit: ["Not Applicable"],
      address: [""],
      allowMaterialStorage: [""],
      setJobForJobPosting: ["Not Applicable"],
      checkBox1: [false],
      checkBox2: [false],
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
      store_data: [
        {
          store_name: null,
          alias_name: null,
          under_type: null,
          excise_tax_unit: null,
          excise_tax_unit_create: {
            tax_unit_name: null,
            alias_unit_name: null,
            address: null,
            state: null,
            pincode: null,
            contact_num: null,
            ragister_for: null,
            in_sez: null,
            ltu: null,
            ltu_name: null,
            alert_excise_detail: null,
            alert_excise_detail_data: {
              unit_name: null,
              ragister_type: null,
              ecc_number: null,
              excise_triff_detail: null,
              excise_triff_detail_data: {
                triff_name: null,
                hsn_code: null,
                reporting_unit_measure: null,
                valuation_type: null,
                rate: null,
                rate_per_unit: null,
              },
              rule_book_details: null,
              rule_book_detail_data: {
                excise_book_list: null,
                excise_book_create_data: {
                  name: null,
                  alias: null,
                  method_of_numbering: null,
                  prevent_duplicate: null,
                  starting_number: null,
                  numerical_part: null,
                  prefill_zero: null,
                  user_for: null,
                  restart_numbering: [
                    {
                      applicable_from: null,
                      starting_numbering: null,
                      particulars: null,
                    },
                  ],
                  prefix_detail: [
                    {
                      applicable_from: null,
                      particulars: null,
                    },
                  ],
                  suffix_detail: [
                    {
                      applicable_from: null,
                      particulars: null,
                    },
                  ],
                },
              },
            },
          },
          address: null,
          allow_storage_of_material: null,
          user_for: {
            third_party_stock: null,
            stock_us: null,
          },
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
    this.payload[0].tpd_status_tally_entity_type = "godown";
    this.payload[0].object_flag_tpd_id = 1;
    this.payload[0].tpd_status_data = "text";
    this.payload[0].tpd_status_report_id = 0;
    this.payload[0].tpd_status_report_data = "";
    this.payload[0].store_data[0].store_name =
      this.godownForm.get("name")?.value;
    this.payload[0].store_data[0].alias_name =
      this.godownForm.get("alias")?.value;
    this.payload[0].store_data[0].under_type =
      this.godownForm.get("under")?.value;
    this.payload[0].store_data[0].excise_tax_unit =
      this.godownForm.get("exciseTaxUnit")?.value;
    this.payload[0].store_data[0].address =
      this.godownForm.get("address")?.value;
    this.payload[0].store_data[0].allow_storage_of_material =
      this.godownForm.get("allowMaterialStorage")?.value;
    this.payload[0].store_data[0].user_for = {
      third_party_stock: this.godownForm.get("thirdPartyStock")?.value,
      stock_us: this.godownForm.get("stockUs")?.value,
    };
  }

  createGodown() {
    this.isLoading = true;
    if (this.godownForm.get("name")?.value) {
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      console.log("Payload:", this.payload);
      this.apiService.addStoreData(this.payload).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response._Object.length !== 0) {
            console.log("Godown created successfully:", response);
            this.router.navigate(["/dashboard/master/godown-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          } else {
            console.error("Error creating godown:", response.message);
          }
        },
        (error) => {
          this.isLoading = false;
          console.error("API Error:", error);
        }
      );
    } else {
      this.isLoading = false;
      this.godownForm.markAllAsTouched();
    }
  }
}
