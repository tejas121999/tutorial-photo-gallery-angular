import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-discount-paid",
  templateUrl: "./discount-paid.component.html",
  styleUrls: ["./discount-paid.component.scss"],
})
export class DiscountPaidComponent implements OnInit {
  discountForm: FormGroup;
  isLoading: boolean = false;
  // Additional Details properties
  // checkBox1 and checkBox2 are now managed by the form
  showAdditionalDetails: boolean = false;
  maintainInBatches: boolean = false;
  trackDateOfManufacture: boolean = false;
  useExpiryDates: boolean = false;
  enableCostTracking: boolean = false;
  isInclusiveOfDutiesAndTaxes: boolean = false;
  branch_token: any;
  login_token: any;

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
    this.discountForm = this.fb.group({
      name: ["", Validators.required],
      alias: [""],
      billwiseBalance: [""],
      affectOnInventory: [""],
      typeOfLedger: ["Not Applicable"],
      GSTApplicant: ["Not Applicable"],
      openingBalance: [""],
      creditPeriod: [""],
      roundingMethod: [""],
      roundingLimit: [""],
      GSTRateDetails: [""],
      taxabilityType: [""],
      natureOfTransaction: [""],
      gstRate: [""],
      cessValuation: ["Not Applicable"],
      cessRate: [""],
      cessRateValue: [""],
      cessRateUnit: [""],
      typeOfSupply: [""],
      additionalCostInPurchaseInvoice: ["Not Applicable"],
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
      paid_discount_data: [
        {
          paid_discount_name: null,
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
    this.payload[0].tpd_status_tally_entity_type = "paid-discount";
    this.payload[0].object_flag_tpd_id = "1";
    this.payload[0].tpd_status_data = "text";
    this.payload[0].tpd_status_report_id = 0;
    this.payload[0].tpd_status_report_data = "";
    const pdData = this.payload[0].paid_discount_data[0];
    pdData.paid_discount_name = this.discountForm.get("name")?.value;
    pdData.alias_name = this.discountForm.get("alias")?.value;
    pdData.maintain_bill_by_bill =
      this.discountForm.get("billwiseBalance")?.value;
    pdData.inventory_value_affect =
      this.discountForm.get("affectOnInventory")?.value;
    pdData.type_of_ledger = this.discountForm.get("typeOfLedger")?.value;
    pdData.rounding_method =
      this.discountForm.get("roundingMethod")?.value || "Rounding Method";
    pdData.rounding_limit =
      this.discountForm.get("roundingLimit")?.value || "0";
    pdData.gst_applicability = this.discountForm.get("GSTApplicant")?.value;

    // Ensure nested objects exist before assignment
    if (!pdData.gst_applicable_data) pdData.gst_applicable_data = {};
    if (!pdData.gst_applicable_data.classification_create_data)
      pdData.gst_applicable_data.classification_create_data = {};
    if (
      !pdData.gst_applicable_data.classification_create_data
        .GSTRateRelatedDetail_data
    )
      pdData.gst_applicable_data.classification_create_data.GSTRateRelatedDetail_data =
        {};
    if (
      !pdData.gst_applicable_data.classification_create_data
        .GSTRateRelatedDetail_data.specify_slab_based_rule
    )
      pdData.gst_applicable_data.classification_create_data.GSTRateRelatedDetail_data.specify_slab_based_rule =
        {};
    if (
      !pdData.gst_applicable_data.classification_create_data
        .GSTRateRelatedDetail_data.specify_slab_based_rule.cess_gst_detail_data
    )
      pdData.gst_applicable_data.classification_create_data.GSTRateRelatedDetail_data.specify_slab_based_rule.cess_gst_detail_data =
        {};

    pdData.gst_applicable_data.classification_create_data.GSTRateRelatedDetail_data.gstRetDetail =
      this.discountForm.get("GSTRateDetails")?.value;
    pdData.gst_applicable_data.classification_create_data.GSTRateRelatedDetail_data.taxtability_type =
      this.discountForm.get("taxabilityType")?.value;
    pdData.gst_applicable_data.classification_create_data.GSTRateRelatedDetail_data.nature_of_tansaction =
      this.discountForm.get("natureOfTransaction")?.value;
    pdData.gst_applicable_data.classification_create_data.GSTRateRelatedDetail_data.specify_slab_based_rule.cess_gst_detail_data.cess_rate =
      this.discountForm.get("cessRate")?.value;
    pdData.gst_applicable_data.classification_create_data.GSTRateRelatedDetail_data.specify_slab_based_rule.cess_gst_detail_data.cess_unit =
      this.discountForm.get("cessRateUnit")?.value;
    pdData.openning_balance =
      this.discountForm.get("openingBalance")?.value || 0;
  }

  createDiscount() {
    this.isLoading = true;
    if (this.discountForm.get("name")?.value) {
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      console.log("Payload:", this.payload);
      this.apiService.addPaidDiscount(this.payload).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response._Object.length !== 0) {
            this.router.navigate(["/dashboard/master/discount-paid-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          } else {
            console.error("Error:", response.message);
          }
        },
        (error) => {
          this.isLoading = false;
          console.error("API Error:", error);
        }
      );
    } else {
      this.isLoading = false;
      this.discountForm.markAllAsTouched();
    }
  }
}
