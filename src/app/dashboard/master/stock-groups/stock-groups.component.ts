import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-stock-groups",
  templateUrl: "./stock-groups.component.html",
  styleUrls: ["./stock-groups.component.scss"],
})
export class StockGroupsComponent {
  stockGroupForm: FormGroup;
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
    this.stockGroupForm = this.fb.group({
      stockGroupName: ["", Validators.required],
      alias: [""],
      under: [""],
      HSNDetails: [""],
      HSN: [""],
      description: [""],
      GSTDetails: [""],
      taxabilityType: [""],
      GSTRate: [""],
      cessValuation: ["Not Applicable"],
      cessRate: [""],
      cessRateValue: [""],
      cessRateUnit: [""],
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
      item_group_data: [
        {
          item_group_name: null,
          alias_name: null,
          under_type: null,
          statutory_detail_data: {
            hsns_sac_data: {
              hsn_sac_detail: null,
              source_of_details: null,
              hsn_sac: null,
              desription: null,
              classification_create_data: {
                classification_name: null,
                hsn_detail_data: {
                  hsn_sac_detail: null,
                  hsn_sac: null,
                  desription: null,
                },
                gst_rate_related_detail_data: {
                  gst_detail: null,
                  specify_slab_based_rate: {
                    create_item_data: [
                      {
                        greater_than: null,
                        igst_rate: null,
                        cgst_rate: null,
                        sgst_utgst_rate: null,
                      },
                      {
                        greater_than: null,
                        igst_rate: null,
                        cgst_rate: null,
                        sgst_utgst_rate: null,
                      },
                    ],
                    cess_gst_detail_data: {
                      cess_rate: null,
                      cess_unit: null,
                    },
                    additionaldetail_data: {
                      eligiable_for_taxable_credit: null,
                    },
                  },
                  taxtability_type: null,
                  nature_of_tansaction: null,
                  igst_rate: null,
                  cgst_rate: null,
                  sgst_utgst_rate: null,
                  cess_valuation_type_data: {
                    cess_rate: null,
                    cess_unit: null,
                  },
                  applicable_for_charge: null,
                  eligiable_for_taxable_credit: null,
                },
              },
            },
            gst_rate_data: {
              gst_Detail: null,
              specify_slab_based_rule: {
                create_item_data: [
                  {
                    greater_than: null,
                    igst_rate: null,
                    cgst_rate: null,
                    sgst_utgst_rate: null,
                  },
                  {
                    greater_than: null,
                    igst_rate: null,
                    cgst_rate: null,
                    sgst_utgst_rate: null,
                  },
                ],
                cess_gst_detail_data: {
                  cess_rate: null,
                  cess_unit: null,
                },
                additionaldetail_data: {
                  eligiable_for_taxable_credit: null,
                },
              },
              taxtability_type: null,
              nature_of_tansaction: null,
              igst_rate: null,
              cgst_rate: null,
              sgst_utgst_rate: null,
              cess_valuation_type_data: {
                cess_rate: null,
                cess_unit: null,
              },
              applicable_for_charge: null,
              eligiable_for_taxable_credit: null,
              other_statutory_details: null,
              other_statutor_detail_data: {
                alter_tds_detail: null,
                tds_detail_data: {
                  nature_of_payment: null,
                  nature_of_payment_create: {
                    nature_name: null,
                    section: null,
                    payment_code: null,
                    remittance_code: null,
                    huf_data: {
                      with_pan: null,
                    },
                    dedutee_data: {
                      with_pan: null,
                    },
                    is_zero_rate: null,
                    exemption_limit: null,
                  },
                },
                alter_excise_detail: null,
                alter_excise_detail_data: {
                  triff_name: null,
                  hsn_code: null,
                  unit_of_measure: null,
                  valuation_type: null,
                  rate: null,
                },
                alter_vat_detail: null,
                alter_vat_detail_data: {
                  tax_rate: null,
                  additional_tax: null,
                  taxable_type: null,
                },
                sales_tax_cess: null,
                sale_tax_cess_data: {
                  tax_rate: null,
                },
                alter_tcs_detail: null,
                create_tcs_detail_data: {
                  nature_of_good: null,
                  nature_of_good_create: {
                    nature_name: null,
                    section: null,
                    payment_code: null,
                    remittance_code: null,
                    huf_data: {
                      with_pan: null,
                      without_pan: null,
                    },
                    dedutee_data: {
                      with_pan: null,
                      without_pan: null,
                    },
                    basd_on_realisation: null,
                    is_zero_rate: null,
                    exemption_limit: null,
                  },
                },
              },
            },
          },
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
    this.payload[0].object_flag_tpd_id = 1;
    this.payload[0].tpd_status_tally_entity_type = "Test";
    this.payload[0].tpd_status_data = "text";
    this.payload[0].tpd_status_report_id = 0;
    this.payload[0].tpd_status_report_data = "";
    this.payload[0].item_group_data[0].item_group_name =
      this.stockGroupForm.get("stockGroupName")?.value;
    this.payload[0].item_group_data[0].alias_name =
      this.stockGroupForm.get("alias")?.value;
    this.payload[0].item_group_data[0].under_type =
      this.stockGroupForm.get("under")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.hsns_sac_data.hsn_sac_detail =
      this.stockGroupForm.get("HSNDetails")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.hsns_sac_data.hsn_sac =
      this.stockGroupForm.get("HSN")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.hsns_sac_data.desription =
      this.stockGroupForm.get("description")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.hsns_sac_data.classification_create_data.hsn_detail_data.hsn_sac =
      this.stockGroupForm.get("HSN")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.hsns_sac_data.classification_create_data.hsn_detail_data.desription =
      this.stockGroupForm.get("description")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.hsns_sac_data.classification_create_data.gst_rate_related_detail_data.gst_detail =
      this.stockGroupForm.get("GSTDetails")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.hsns_sac_data.classification_create_data.gst_rate_related_detail_data.taxtability_type =
      this.stockGroupForm.get("taxabilityType")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.hsns_sac_data.classification_create_data.gst_rate_related_detail_data.specify_slab_based_rate.cess_gst_detail_data.cess_rate =
      this.stockGroupForm.get("cessRate")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.hsns_sac_data.classification_create_data.gst_rate_related_detail_data.specify_slab_based_rate.cess_gst_detail_data.cess_unit =
      this.stockGroupForm.get("cessRateUnit")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.hsns_sac_data.classification_create_data.gst_rate_related_detail_data.cess_valuation_type_data.cess_rate =
      this.stockGroupForm.get("cessRateValue")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.hsns_sac_data.classification_create_data.gst_rate_related_detail_data.cess_valuation_type_data.cess_unit =
      this.stockGroupForm.get("cessValuation")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.gst_rate_data.specify_slab_based_rule.cess_gst_detail_data.cess_rate =
      this.stockGroupForm.get("cessRate")?.value;
    this.payload[0].item_group_data[0].statutory_detail_data.gst_rate_data.specify_slab_based_rule.cess_gst_detail_data.cess_unit =
      this.stockGroupForm.get("cessRateUnit")?.value;
  }

  addStockGroup() {
    this.isLoading = true;
    if (this.stockGroupForm.get("stockGroupName")?.value) {
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      this.apiService.addItemGroupData(this.payload).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.router.navigate(["/dashboard/master/stock-group-list"], {
            queryParams: { reload: new Date().getTime() },
          });
          this.stockGroupForm.reset();
        },
        (error) => {
          this.isLoading = false;
          console.error("Error adding stock item:", error);
          // Handle error response
        }
      );
    } else {
      this.isLoading = false;
      this.stockGroupForm.markAllAsTouched();
    }
  }
}
