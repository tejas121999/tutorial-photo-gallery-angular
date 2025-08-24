import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppPreference } from "src/app/shared/app-preference";
import { ApiServiceService } from "src/app/services/api-service.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-tax",
  templateUrl: "./tax.page.html",
  styleUrls: ["./tax.page.scss"],
})
export class TaxPage implements OnInit {
  taxForm: FormGroup;
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  showAdditionalDetails: boolean = false;

  constructor(
    private fb: FormBuilder,
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private router: Router
  ) {
    this.initializeData();
  }

  async initializeData() {
    this.taxForm = this.fb.group({
      taxName: ["", Validators.required],
      alias: [""],
      typeOfTax: [""],
      typeTax: [""],
      valuationType: [""],
      percentage: [""],
      roundingMethod: ["Not Applicable"],
      roundingLimit: [""],
      name: [""],
      address: [""],
      mobile: [""],
      pan: [""],
      bankDetails: [""],
      openingBalance: [""],
      chequeNumber: [""],
      accountNumber: [""],
      ifscCode: [""],
      bankName: [""],
    });

    this.branch_token = await this.appPreference.get("branch_token_id");
    this.login_token = await this.appPreference.get("_LoginToken");
  }

  ngOnInit() {
    console.log("TaxPage initialized");
  }

  payload: any = [
    {
      login_token: null,
      branch_token: null,
      object_flag_tpd_id: 1,
      tpd_status_tally_entity_type: null,
      tpd_status_data: null,
      tpd_status_report_id: null,
      tpd_status_report_data: null,
      tax_data: [
        {
          tax_name: null,
          alias_name: null,
          type_of_tax: null,
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
          bank_data: {},
          maintain_bill_by_bill: null,
          bill_bill_data: {
            default_created_period: null,
          },
          inventory_value_affect: null,
          method_appro_allocate: null,
          additional_cost_in_purchase_invoice: null,
          cost_center_applicable: null,
          percentage_of_calculation: null,
          rounding_method: null,
          rounding_limit: null,
          statutory_detaial_data: {
            value_calculation: null,
            approprite_to: null,
            method_of_calculation: null,
            other_satutory_detail: null,
            other_satutory_detail_data: {
              tax_tds_data: {
                tds_applicable: null,
                tds_nature_of_payment: null,
                tds_nature_of_payment_data: {
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
            },
          },
          tax_reg_data: {
            gstin_no: null,
          },
          openning_balance: null,
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
    this.payload[0].object_flag_tpd_id = 1;
    this.payload[0].tpd_status_report_id = 0;
    this.payload[0].login_token = this.login_token;
    this.payload[0].branch_token = this.branch_token;
    this.payload[0].tax_data[0].tax_name = this.taxForm.get("taxName")?.value;
    this.payload[0].tax_data[0].alias_name = this.taxForm.get("alias")?.value;
    this.payload[0].tax_data[0].type_of_tax =
      this.taxForm.get("typeOfTax")?.value;
    this.payload[0].tax_data[0].mailing_data.address =
      this.taxForm.get("address")?.value;
    this.payload[0].tax_data[0].mailing_data.contact_no =
      this.taxForm.get("mobile")?.value;
    this.payload[0].tax_data[0].mailing_data.contact_person_data.cnt_name =
      this.taxForm.get("name")?.value;
    this.payload[0].tax_data[0].mailing_data.contact_person_data.cnt_phone_no =
      this.taxForm.get("mobile")?.value;
    if (this.taxForm.get("bankDetails")?.value === "Cheque") {
      this.payload[0].tax_data[0].bank_data = {
        cheque_number: this.taxForm.get("chequeNumber")?.value,
      };
    }
    if (this.taxForm.get("bankDetails")?.value === "e - fund Transfer") {
      this.payload[0].tax_data[0].bank_data = {
        account_number: this.taxForm.get("accountNumber")?.value,
        ifsc_code: this.taxForm.get("ifscCode")?.value,
        bank_name: this.taxForm.get("bankName")?.value,
        opening_balance: this.taxForm.get("openingBalance")?.value,
      };
    }
    if (this.taxForm.get("bankDetails")?.value === "Other") {
      this.payload[0].tax_data[0].bank_data = {
        opening_balance: this.taxForm.get("openingBalance")?.value,
      };
    }
    this.payload[0].tax_data[0].percentage_of_calculation =
      this.taxForm.get("percentage")?.value;
    this.payload[0].tax_data[0].rounding_method =
      this.taxForm.get("roundingMethod")?.value;
    this.payload[0].tax_data[0].rounding_limit =
      this.taxForm.get("roundingLimit")?.value;
    this.payload[0].tax_data[0].statutory_detaial_data.other_satutory_detail_data.tax_tds_data.tds_nature_of_payment_data.huf_data.with_pan =
      this.taxForm.get("pan")?.value;
    this.payload[0].tax_data[0].statutory_detaial_data.other_satutory_detail_data.tax_tds_data.tds_nature_of_payment_data.dedutee_data.with_pan =
      this.taxForm.get("pan")?.value;
    this.payload[0].tax_data[0].openning_balance =
      this.taxForm.get("openingBalance")?.value;
  }

  addTax() {
    this.isLoading = true;
    if (this.taxForm.get("taxName").value) {
      // Call the API to add the tax
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      console.log("Payload:", this.payload);
      this.apiService.addTax(this.payload).subscribe(
        (response) => {
          console.log("Tax added successfully:", response);
          // Call getTaxList after successful add
          this.isLoading = false;
          this.router.navigate(["/dashboard/master/tax-list"], {
            queryParams: { reload: new Date().getTime() },
          });
          // Optionally, reset the form or navigate to another page
          this.taxForm.reset();
        },
        (error) => {
          console.error("Error adding tax:", error);
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
      this.taxForm.markAllAsTouched();
    }
  }
}
