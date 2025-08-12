import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-cash",
  templateUrl: "./cash.component.html",
  styleUrls: ["./cash.component.scss"],
})
export class CashComponent implements OnInit {
  cashForm: FormGroup;
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
    this.cashForm = this.fb.group({
      name: ["", Validators.required],
      alias: [""],
      openingBalance: [""],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
    });
  }

  payload: any[] = [
    {
      login_token: "",
      branch_token: "",
      object_flag_tpd_id: "",
      tpd_status_tally_entity_type: "",
      tpd_status_data: "",
      tpd_status_report_id: "",
      tpd_status_report_data: "",
      cash_data: [
        {
          cash_name: "",
          customer_alias: "",
          type_of_lagunage: "",
          mailing_data: {
            address: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            contact_no: "",
            multi_contact_no: "",
            default_whatsapp_no: {
              wh_number: "",
            },
            contact_person_data: {
              cnt_name: "",
              cnt_phone_no: "",
              cnt_primary_no: "",
              cnt_fax: "",
              cnt_email: "",
              cnt_cc_any: "",
              cnt_website: "",
            },
          },
          bank_data: {
            bank_detail: "",
          },
          tax_ragistration_data: {
            pan_no: "",
            reg_type: "",
            reg_type_data: {
              other_territery: "",
              gstin_no: "",
              ledger_as_common_party: "",
              aditional_gst_detail_data: {
                place_of_suppile: "",
                party_of_transpost: "",
                transpot_id: "",
              },
              prefixed_suffixed_data: {
                application_from: "",
                prifixe: "",
                suffixe: "",
              },
              msme_reg_detail_data: {
                type_of_enterprice: "",
                msmeReg_data: {
                  msmeReg_date: "",
                },
                udyam_reg_num: "",
                type_active: "",
                type_active_date: {
                  msmeReg_date: "",
                },
              },
              excise_detail_data: {
                nature_of_purchase: "",
                ragistration_of_info: {
                  ECC_no: "",
                  impoter_ecc_no: "",
                  iec_no: "",
                  range: "",
                  division: "",
                  commissionerate: "",
                },
              },
              service_tax_data: {
                service_tax_reg_no: "",
                service_type: "",
                party_associ_enterprise: "",
                non_taxable_territry: "",
              },
              vat_detail_data: {
                type_dealer: "",
                vat_tin_no: "",
                reg_date: "",
                cst_no: "",
                cst_reg_date: "",
                again_c_from: "",
              },
            },
          },
          openning_balance: "",
        },
      ],
    },
  ];

  createPayload() {
    this.payload[0].login_token = this.login_token;
    this.payload[0].branch_token = this.branch_token;
    this.payload[0].object_flag_tpd_id = "1";
    this.payload[0].tpd_status_tally_entity_type = "Test";
    this.payload[0].tpd_status_data = "text";
    this.payload[0].tpd_status_report_id = 0;
    this.payload[0].tpd_status_report_data = "";
    this.payload[0].cash_data[0].cash_name = this.cashForm.get("name")?.value;
    this.payload[0].cash_data[0].customer_alias =
      this.cashForm.get("alias")?.value;
    this.payload[0].cash_data[0].opening_balance =
      this.cashForm.get("openingBalance")?.value || 0;
  }

  addCashData() {
    this.isLoading = true;
    if (this.cashForm.get("name")?.value) {
      this.createPayload();
      this.apiService.addCashData(this.payload).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response._Object !== 0) {
            this.router.navigate(["/dashboard/payment/cash-list"], {
              queryParams: { reload: new Date().getTime() },
            });
            this.cashForm.reset();
          } else {
            this.isLoading = false;
            // Handle error case
          }
        },
        (error) => {
          this.isLoading = false;
          // Handle error case
          console.error("Error adding bank data:", error);
        }
      );
    } else {
      this.isLoading = false;
      this.cashForm.markAllAsTouched();
    }
  }
}
