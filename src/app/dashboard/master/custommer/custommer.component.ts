import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-custommer",
  templateUrl: "./custommer.component.html",
  styleUrls: ["./custommer.component.scss"],
})
export class CustommerComponent {
  customerForm: FormGroup;
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
    this.customerForm = this.fb.group({
      customerName: ["", Validators.required],
      alias: [""],
      billwiseBalance: [""],
      creditPeriod: [""],
      creditDaysCheck: [""],
      creditLimit: [""],
      name: [""],
      mobile: [""],
      address: [""],
      state: [""],
      country: [""],
      pincode: [""],
      pan: [""],
      registrationType: [""],
      gstinUin: [""],
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
      customer_data: [
        {
          customer_name: null,
          customer_alias: null,
          maintain_bill_by_bill: null,
          Default_credit_period: null,
          credit_day_voucher_entry: null,
          inventory_value_effected: null,
          cost_center_are_applicable: null,
          other_statutory_detail: null,
          statutory_detail_data: {
            tds_deductable: null,
            deductee_type: null,
            deducty_the_same_voucher: null,
            same_voucher_data: {
              nature_of_payment: null,
            },
            pan_number: null,
            pan_data: {
              pan_status: null,
              tax_number: null,
              name_of_pan: null,
            },
          },
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
          tax_ragistration_data: {
            pan_no: null,
            reg_type: null,
            reg_type_data: {
              other_territery: null,
              gstin_no: null,
              ledger_as_common_party: null,
              aditional_gst_detail_data: {
                place_of_suppile: null,
                party_of_transpost: null,
                transpot_id: null,
              },
              prefixed_suffixed_data: {
                application_from: null,
                prifixe: null,
                suffixe: null,
              },
              msme_reg_detail_data: {
                type_of_enterprice: null,
                msmeReg_data: {
                  msmeReg_date: null,
                },
              },
              excise_detail_data: {
                nature_of_purchase: null,
                ragistration_of_info: {
                  ECC_no: null,
                  impoter_ecc_no: null,
                  iec_no: null,
                  range: null,
                  division: null,
                  commissionerate: null,
                },
              },
              service_tax_data: {
                service_tax_reg_no: null,
                service_type: null,
                party_associ_enterprise: null,
                non_taxable_territry: null,
              },
              vat_detail_data: {
                type_dealer: null,
                vat_tin_no: null,
                reg_date: null,
                cst_no: null,
                cst_reg_date: null,
                again_c_from: null,
              },
            },
          },
          openning_balance: null,
        },
      ],
      tax_data: [
        {
          bank_data: {},
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
    this.payload[0].tpd_status_report_id = 0;
    this.payload[0].tpd_status_tally_entity_type = "Test";
    this.payload[0].tpd_status_data = "text";
    this.payload[0].tpd_status_report_data = "";
    this.payload[0].customer_data[0].customer_name =
      this.customerForm.get("customerName")?.value;
    this.payload[0].customer_data[0].customer_alias =
      this.customerForm.get("alias")?.value;
    this.payload[0].customer_data[0].maintain_bill_by_bill =
      this.customerForm.get("billwiseBalance")?.value;
    this.payload[0].customer_data[0].Default_credit_period =
      this.customerForm.get("creditPeriod")?.value;
    this.payload[0].customer_data[0].credit_day_voucher_entry =
      this.customerForm.get("creditDaysCheck")?.value;
    this.payload[0].customer_data[0].statutory_detail_data.pan_number =
      this.customerForm.get("pan")?.value;
    this.payload[0].customer_data[0].statutory_detail_data.pan_data.name_of_pan =
      this.customerForm.get("name")?.value;
    this.payload[0].customer_data[0].mailing_data.address =
      this.customerForm.get("address")?.value;
    this.payload[0].customer_data[0].mailing_data.state =
      this.customerForm.get("state")?.value;
    this.payload[0].customer_data[0].mailing_data.country =
      this.customerForm.get("country")?.value;
    this.payload[0].customer_data[0].mailing_data.pincode =
      this.customerForm.get("pincode")?.value;
    this.payload[0].customer_data[0].mailing_data.contact_no =
      this.customerForm.get("mobile")?.value;
    this.payload[0].customer_data[0].mailing_data.contact_person_data.cnt_name =
      this.customerForm.get("name")?.value;
    this.payload[0].customer_data[0].mailing_data.contact_person_data.cnt_phone_no =
      this.customerForm.get("mobile")?.value;
    this.payload[0].customer_data[0].tax_ragistration_data.gstin_no =
      this.customerForm.get("gstinUin")?.value;
    this.payload[0].customer_data[0].tax_ragistration_data.reg_type =
      this.customerForm.get("registrationType")?.value;
    this.payload[0].customer_data[0].tax_ragistration_data.reg_type_data.gstin_no =
      this.customerForm.get("gstinUin")?.value;
    if (this.customerForm.get("bankDetails")?.value === "Cheque") {
      this.payload[0].customer_data[0].bank_data = {
        cheque_number: this.customerForm.get("chequeNumber")?.value,
      };
    }
    if (this.customerForm.get("bankDetails")?.value === "e - fund Transfer") {
      this.payload[0].customer_data[0].bank_data = {
        account_number: this.customerForm.get("accountNumber")?.value,
        ifsc_code: this.customerForm.get("ifscCode")?.value,
        bank_name: this.customerForm.get("bankName")?.value,
        opening_balance: this.customerForm.get("openingBalance")?.value,
      };
    }
    if (this.customerForm.get("bankDetails")?.value === "Other") {
      this.payload[0].customer_data[0].openning_balance =
        this.customerForm.get("openingBalance")?.value;
    }
  }

  addCustomer() {
    this.isLoading = true;
    if (this.customerForm.get("customerName")?.value) {
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      console.log("Payload:", this.payload);
      this.apiService.addCustomerData(this.payload).subscribe(
        (response) => {
          console.log("Customer added successfully:", response);
          // Navigate to customer list or show success message
          this.router.navigate(["/dashboard/master/customer-list"], {
            queryParams: { reload: new Date().getTime() },
          });
          this.customerForm.reset();
          this.isLoading = false;
        },
        (error) => {
          console.error("Error adding customer:", error);
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
      this.customerForm.markAllAsTouched();
    }
  }
}
