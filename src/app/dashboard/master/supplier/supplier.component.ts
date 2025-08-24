import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-supplier",
  templateUrl: "./supplier.component.html",
  styleUrls: ["./supplier.component.scss"],
})
export class SupplierComponent implements OnInit {
  supplierForm: FormGroup;
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
    console.log("hello supplier");
  }

  async initializeData() {
    this.supplierForm = this.fb.group({
      supplierName: ["", Validators.required],
      alias: [""],
      billwiseBalance: [""],
      creditPeriod: [""],
      creditLimit: [""],
      name: [""],
      mobile: [""],
      address: [""],
      state: [""],
      country: [""],
      pincode: [""],
      pan: [""],
      registrationType: [""],
      gstin: [""],
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
      supplier_data: [
        {
          supplier_name: null,
          supplier_alias: null,
          ledger_parent_group_name: null,
          type_of_lagunage: null,
          maintain_bill_by_bill: null,
          Default_credit_period: null,
          credit_day_voucher_entry: null,
          inventory_value_effected: null,
          cost_center_are_applicable: null,
          other_statutory_detail: null,
          statutory_detail_data: {
            tds_name: null,
            tds_deductable: null,
            deductee_type: null,
            deducty_the_same_voucher: null,
            same_voucher_data: {
              nature_of_payment: null,
            },
            advance_tds_entries: null,
            tds_entries_data: {
              surcharge_limit: null,
              tax_limit: null,
              tax_limit_data: {
                nature_of_payment: null,
              },
              lower_dedution: null,
              lower_dedution_data: {
                payment_name: null,
                section: null,
                payment_code: null,
                remitation_code: null,
                rate_of_indivisual: null,
                rate_of_other_dedation: null,
              },
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
            address_1: null,
            address_2: null,
            address_3: null,
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
                udyam_reg_num: null,
                type_active: null,
                type_active_date: {
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
    this.payload[0].supplier_data[0].supplier_name =
      this.supplierForm.get("supplierName")?.value;
    this.payload[0].supplier_data[0].supplier_alias =
      this.supplierForm.get("alias")?.value;
    this.payload[0].supplier_data[0].Default_credit_period =
      this.supplierForm.get("creditPeriod")?.value;
    this.payload[0].supplier_data[0].maintain_bill_by_bill =
      this.supplierForm.get("billwiseBalance")?.value;
    this.payload[0].supplier_data[0].mailing_data.address =
      this.supplierForm.get("address")?.value;
    this.payload[0].supplier_data[0].mailing_data.contact_no =
      this.supplierForm.get("mobile")?.value;
    this.payload[0].supplier_data[0].mailing_data.state =
      this.supplierForm.get("state")?.value;
    this.payload[0].supplier_data[0].mailing_data.country =
      this.supplierForm.get("country")?.value;
    this.payload[0].supplier_data[0].mailing_data.pincode =
      this.supplierForm.get("pincode")?.value;
    this.payload[0].supplier_data[0].mailing_data.contact_person_data.cnt_name =
      this.supplierForm.get("name")?.value;
    this.payload[0].supplier_data[0].mailing_data.contact_person_data.cnt_phone_no =
      this.supplierForm.get("mobile")?.value;
    this.payload[0].supplier_data[0].tax_ragistration_data.pan_no =
      this.supplierForm.get("pan")?.value;
    this.payload[0].supplier_data[0].tax_ragistration_data.reg_type =
      this.supplierForm.get("registrationType")?.value;
    if (this.supplierForm.get("bankDetails")?.value === "Cheque") {
      this.payload[0].supplier_data[0].bank_data = {
        cheque_number: this.supplierForm.get("chequeNumber")?.value,
      };
    }
    if (this.supplierForm.get("bankDetails")?.value === "e - fund Transfer") {
      this.payload[0].supplier_data[0].bank_data = {
        account_number: this.supplierForm.get("accountNumber")?.value,
        ifsc_code: this.supplierForm.get("ifscCode")?.value,
        bank_name: this.supplierForm.get("bankName")?.value,
        opening_balance: this.supplierForm.get("openingBalance")?.value,
      };
    }
    if (this.supplierForm.get("bankDetails")?.value === "Other") {
      this.payload[0].supplier_data[0].bank_data = {
        opening_balance: this.supplierForm.get("openingBalance")?.value,
      };
    }
  }

  addSupplier() {
    this.isLoading = true;
    if (this.supplierForm.get("supplierName")?.value) {
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      console.log("Payload:", this.payload);
      this.apiService.addSupplierData(this.payload).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response?._Object !== null) {
            this.supplierForm.reset();
            this.router.navigate(["/dashboard/master/supplier-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          } else {
            console.error("Error adding supplier:", response);
          }
        },
        (error) => {
          this.isLoading = false;
          console.error("API Error:", error);
        }
      );
    } else {
      this.isLoading = false;
      this.supplierForm.markAllAsTouched();
    }
  }
}
