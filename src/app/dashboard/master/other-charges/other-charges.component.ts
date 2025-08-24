import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-other-charges",
  templateUrl: "./other-charges.component.html",
  styleUrls: ["./other-charges.component.scss"],
})
export class OtherChargesComponent {
  otherChargesForm: FormGroup;
  branch_token: any;
  login_token: any;
  showAdditionalDetails: boolean = false;
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
    this.otherChargesForm = this.fb.group({
      name: ["", Validators.required],
      alias: [""],
      billwiseBalance: [""],
      creditPeriod: [""],
      affectOnInventory: [""],
      typeOfLedger: ["Not Applicable"],
      roundingMethod: [""],
      roundingLimit: [""],
      GSTApplicable: ["Not Applicable"],
      HSNDetails: [""],
      GSTRateDetails: [""],
      typeOfSupply: [""],
      enableCostCenter: [""],
      openingBalance: [""],
      additionalCostInPurchaseInvoice: ["Not Applicable"],
      useForPayroll: [""],
      costCenterApplicable: [""],
      allowCostAllocation: [""],
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
      other_expense_data: [
        {
          other_expense_name: null,
          alias_name: null,
          mailing_data: {
            address: null,
            city: null,
            state: null,
            country: null,
            pincode: null,
            contact_no: null,
            multi_contact_no: null,
            default_whatsapp_no: {
              wh_number: null,
            },
            contact_person_data: {
              cnt_name: null,
              cnt_phone_no: null,
              cnt_primary_no: null,
              cnt_fax: null,
              cnt_email: null,
              cnt_cc_any: null,
              cnt_website: null,
            },
          },
          bank_data: {
            bank_detail: null,
          },
          under_type: null,
          ledger_type: null,
          rounding_method: null,
          rounding_limit: null,
          maintain_bill_by_bill: null,
          bill_bill_data: {
            default_created_period: null,
          },
          inventory_value_affect: null,
          type_of_ledger: null,
          rounding_invoice_data: {
            method_of_rounding: null,
            limit_of_rounding: null,
          },
          cost_center_applicable: null,
          statutory_detail_data: {
            value_calculation: null,
            value_cal_data: {
              approprite_to: null,
              method_of_calculation: null,
            },
          },
          gst_applicability: null,
          gst_applicable_data: {
            hsn_sac_detail_data: {
              hsn_sac_detail: null,
              source_of_details: null,
              hsn_sac: null,
              desription: null,
              classification_create_data: {
                classification_name: null,
                clsHSNdetail_data: {
                  hsn_sac_detail: null,
                  hsn_sac: null,
                  desription: null,
                },
                GSTRateRelatedDetail_data: {
                  gstRetDetail: null,
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
                  type_of_suppile: null,
                  eligiable_for_taxable_credit: null,
                  other_statutor_detail_data: {
                    service_tax_detail_data: {
                      service_tax_applicable: null,
                      tax_detail_data: {
                        tax_name: null,
                        tax_detail_data: {
                          service_tax: null,
                          eductation_tax: null,
                          secondary_edu_tax: null,
                          swachha_bharat_cess: null,
                          krishi_kalayan_cess: null,
                        },
                      },
                    },
                    tcs_detail_create_data: {
                      is_applicable: null,
                      nature_of_goods: null,
                      tcs_create_data: {
                        tcs_name_nature: null,
                        section: null,
                        payment_code: null,
                        rate_individuals_data: {
                          with_pan: null,
                          without_pan: null,
                        },
                        collectee_type_data: {
                          with_pan: null,
                          without_pan: null,
                        },
                        is_zero_related: null,
                        tax_calculation_based_on_realisation: null,
                        exemption_limit: null,
                        exemption_limit_data: {
                          tax_on_value: null,
                        },
                        excise_data: {
                          excise_application: null,
                          set_alter: null,
                        },
                        vat_data: {
                          is_vat_cst_applicable: null,
                          set_alter: null,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          discount_tax_data: {
            gstin_uin_no: null,
          },
          openning_balance: null,
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
    this.payload[0].other_expense_data[0] = {
      other_expense_name: this.otherChargesForm.get("name")?.value,
      alias_name: this.otherChargesForm.get("alias")?.value,
      maintain_bill_by_bill:
        this.otherChargesForm.get("billwiseBalance")?.value,
      inventory_value_affect:
        this.otherChargesForm.get("affectOnInventory")?.value,
      type_of_ledger: this.otherChargesForm.get("typeOfLedger")?.value,
      rounding_method:
        this.otherChargesForm.get("roundingMethod")?.value || "rounding_method",
      rounding_limit: this.otherChargesForm.get("roundingLimit")?.value || "0",
      gst_applicability: this.otherChargesForm.get("GSTApplicable")?.value,
      openning_balance:
        this.otherChargesForm.get("openingBalance")?.value || "0",
      cost_center_applicable: this.otherChargesForm.get("costCenterApplicable")
        ?.value,
    };
    // Ensure gst_applicable_data exists before setting hsn_sac_detail_data
    if (!this.payload[0].other_expense_data[0].gst_applicable_data) {
      this.payload[0].other_expense_data[0].gst_applicable_data = {};
    }
    this.payload[0].other_expense_data[0].gst_applicable_data.hsn_sac_detail_data =
      {
        hsn_sac_detail: this.otherChargesForm.get("HSNDetails")?.value,
        classification_create_data: {
          GSTRateRelatedDetail_data: {
            gstRetDetail: this.otherChargesForm.get("GSTRateDetails")?.value,
            type_of_suppile: this.otherChargesForm.get("typeOfSupply")?.value,
          },
        },
      };
  }

  createOtherCharges() {
    this.isLoading = true;
    if (this.otherChargesForm.get("name")?.value) {
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      console.log("Payload:", this.payload);
      this.apiService.addOtherExpense(this.payload).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response?._Object?.length !== 0) {
            this.router.navigate(["/dashboard/master/other-charges-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          } else {
            console.error("Error:", response.message);
          }
        },
        (error) => {
          console.error("Error:", error);
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
      this.otherChargesForm.markAllAsTouched();
    }
  }
}
