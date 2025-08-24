import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-sales-account",
  templateUrl: "./sales-account.component.html",
  styleUrls: ["./sales-account.component.scss"],
})
export class SalesAccountComponent {
  salesAccountForm: FormGroup;
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  showAdditionalDetails: boolean = false;

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
    this.salesAccountForm = this.fb.group({
      salesName: ["", Validators.required],
      alias: [""],
      ledgerType: ["Not Applicable"],
      gstApplicable: ["Not Applicable"],
      HSNDetails: [""],
      hsn: [""],
      gstRateDetails: [""],
      description: [""],
      taxabilityType: [""],
      gstRate: [""],
      supplyType: [""],
      name: [""],
      address: [""],
      pan: [""],
      bankDetails: [""],
      openingBalance: [""],
      chequeNumber: [""],
      accountNumber: [""],
      ifscCode: [""],
      bankName: [""],
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
      sales_data: [
        {
          sales_name: null,
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
          rounding_method: "Rounding Method",
          rounding_limit: "6",
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
    this.payload[0].tpd_status_tally_entity_type = "test";
    this.payload[0].tpd_status_data = "text";
    this.payload[0].tpd_status_report_id = 0;
    this.payload[0].tpd_status_report_data = "";
    this.payload[0].sales_data[0].rounding_method = "Rounding Method";
    this.payload[0].sales_data[0].rounding_limit = "6";
    this.payload[0].sales_data[0].sales_name =
      this.salesAccountForm.get("salesName")?.value;
    this.payload[0].sales_data[0].alias_name =
      this.salesAccountForm.get("alias")?.value;
    this.payload[0].sales_data[0].ledger_type =
      this.salesAccountForm.get("ledgerType")?.value;
    this.payload[0].sales_data[0].gst_applicability =
      this.salesAccountForm.get("gstApplicable")?.value;
    this.payload[0].sales_data[0].gst_applicable_data.hsn_sac_detail_data.hsn_sac_detail =
      this.salesAccountForm.get("hsnSacDetail")?.value;
    this.payload[0].sales_data[0].gst_applicable_data.hsn_sac_detail_data.hsn_sac =
      this.salesAccountForm.get("hsn")?.value;
    this.payload[0].sales_data[0].gst_applicable_data.hsn_sac_detail_data.desription =
      this.salesAccountForm.get("description")?.value;
    this.payload[0].sales_data[0].gst_applicable_data.hsn_sac_detail_data.classification_create_data.clsHSNdetail_data.hsn_sac_detail =
      this.salesAccountForm.get("hsnSacDetail")?.value;
    this.payload[0].sales_data[0].gst_applicable_data.hsn_sac_detail_data.classification_create_data.clsHSNdetail_data.hsn_sac =
      this.salesAccountForm.get("hsn")?.value;
    this.payload[0].sales_data[0].gst_applicable_data.hsn_sac_detail_data.classification_create_data.clsHSNdetail_data.desription =
      this.salesAccountForm.get("description")?.value;
    this.payload[0].sales_data[0].gst_applicable_data.hsn_sac_detail_data.classification_create_data.GSTRateRelatedDetail_data.gstRetDetail =
      this.salesAccountForm.get("gstRateDetails")?.value;
    this.payload[0].sales_data[0].gst_applicable_data.hsn_sac_detail_data.classification_create_data.GSTRateRelatedDetail_data.taxtability_type =
      this.salesAccountForm.get("taxabilityType")?.value;
    this.payload[0].sales_data[0].gst_applicable_data.hsn_sac_detail_data.classification_create_data.GSTRateRelatedDetail_data.type_of_suppile =
      this.salesAccountForm.get("supplyType")?.value;
    this.payload[0].sales_data[0].mailing_data.address =
      this.salesAccountForm.get("address")?.value;
    this.payload[0].sales_data[0].mailing_data.contact_person_data.cnt_name =
      this.salesAccountForm.get("name")?.value;
    this.payload[0].sales_data[0].bank_data = {
      opening_balance: "0",
    };
    if (this.salesAccountForm.get("bankDetails")?.value === "Cheque") {
      this.payload[0].sales_data[0].bank_data = {
        cheque_number: this.salesAccountForm.get("chequeNumber")?.value,
      };
    }
    if (
      this.salesAccountForm.get("bankDetails")?.value === "e - fund Transfer"
    ) {
      this.payload[0].sales_data[0].bank_data = {
        account_number: this.salesAccountForm.get("accountNumber")?.value,
        ifsc_code: this.salesAccountForm.get("ifscCode")?.value,
        bank_name: this.salesAccountForm.get("bankName")?.value,
      };
    }

    this.payload[0].sales_data[0].openning_balance =
      this.salesAccountForm.get("openingBalance")?.value || "0";
  }

  addSalesAccount() {
    console.log("Adding Sales Account...");
    this.isLoading = true;
    if (this.salesAccountForm.get("salesName")?.value) {
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      console.log("Payload:", this.payload);
      this.apiService.addSalesData(this.payload).subscribe(
        (response: any) => {
          console.log("Response:", response);
          this.isLoading = false;
          if (response._Object.length !== 0) {
            this.router.navigate(["/dashboard/master/sales-account-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          } else {
            alert("Failed to add sales account. Please try again.");
          }
        },
        (error) => {
          console.error("Error:", error);
          this.isLoading = false;
          alert("An error occurred while adding sales account.");
        }
      );
    } else {
      this.isLoading = false;
      this.salesAccountForm.markAllAsTouched();
    }
  }
}
