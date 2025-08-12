import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-bank",
  templateUrl: "./bank.component.html",
  styleUrls: ["./bank.component.scss"],
})
export class BankComponent implements OnInit {
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  bankForm: FormGroup;
  banks: string[] = [
    "Allahabad Bank",
    "Andhra Bank",
    "Axis Bank",
    "Bank of Bahrain and Kuwait",
    "Bank of Baroda - Corporate Banking",
    "Bank of Baroda - Retail Banking",
    "Bank of India",
    "Bank of Maharashtra",
    "Canara Bank",
    "Central Bank of India",
    "City Union Bank",
    "Corporation Bank",
    "Deutsche Bank",
    "Development Credit Bank",
    "Dhanlaxmi Bank",
    "Federal Bank",
    "ICICI Bank",
    "IDBI Bank",
    "Indian Bank",
    "Indian Overseas Bank",
    "IndusInd Bank",
    "ING Vysya Bank",
    "Jammu and Kashmir Bank",
    "Karnataka Bank Ltd",
    "Karur Vysya Bank",
    "Kotak Bank",
    "Laxmi Vilas Bank",
    "Oriental Bank of Commerce",
    "Punjab National Bank - Corporate Banking",
    "Punjab National Bank - Retail Banking",
    "Punjab & Sind Bank",
    "Shamrao Vitthal Co-operative Bank",
    "South Indian Bank",
    "State Bank of Bikaner & Jaipur",
    "State Bank of Hyderabad",
    "State Bank of India",
    "State Bank of Mysore",
    "State Bank of Patiala",
    "State Bank of Travancore",
    "Syndicate Bank",
    "Tamilnad Mercantile Bank Ltd.",
    "UCO Bank",
    "Union Bank of India",
    "United Bank of India",
    "Vijaya Bank",
    "Yes Bank Ltd",
  ];

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
    this.bankForm = this.fb.group({
      name: ["", Validators.required],
      alias: [""],
      acHolderName: [""],
      acNumber: [""],
      ifscCode: [""],
      swiftCode: [""],
      bankName: [""],
      branch: [""],
      bsrCode: [""],
      contactName: [""],
      mobile: [""],
      address: [""],
      state: [""],
      country: [""],
      pincode: [""],
      gstin: [""],
      serviceTaxDetails: [""],
      serviceTaxNo: [""],
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
      bank_data: [
        {
          bank_name: "",
          bank_alias: "",
          type_of_lagunage: "",
          behave_as_payment_gateway_ledger: "",
          cost_center_are_applicable: "",
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
          bank_detail_data: {
            ac_holder_name: "",
            ac_number: "",
            ifs_code: "",
            swift_code: "",
            branch_name: "",
            branch: "",
            bsr: "",
          },
          bank_configuration_data: {
            rang_of_cheque_book: "",
            enable_cheque_printing: "",
            cheque_printing_configuration: "",
            cheque_printing_configuration_data: {
              cheque_dimension_data: {
                width_of_cheque: "",
                heigth_of_cheque: "",
              },
              cross_cheque_data: {
                left_edge: "",
                top_edge: "",
              },
              cheque_date_data: {
                top_edge: "",
                left_edge: "",
                style_of_data: "",
                separator_use_date: "",
                separator_with: "",
                distance_between_char: "",
              },
              party_data: {
                distance_of_line_from_top_edge: "",
                start_location_from_left_edge: "",
                width_area: "",
              },
              amount_in_word_data: {
                sec_line_top_edge: "",
                first_sec_line_top_edge: "",
                distnace_a_b: "",
                location_first_left_edge: "",
                location_sec_left_edge: "",
                width_area: "",
                currency_formal_name: "",
              },
              amount_in_figure_data: {
                distance_from_top_edge: "",
                starting_location_left_edge: "",
                width_area: "",
                currency_symbol: "",
              },
              company_signatory_detail_data: {
                name_on_cheque: "",
                print_name_on_cheque: "",
                first_signatory: "",
                sec_single_signatory: "",
                distance_from_top_edge: "",
                starting_location_from_left_edge: "",
                width_of_signature_area: "",
                height_of_signature_are: "",
              },
            },
          },
          tax_data: {
            gstin_uin_no: "",
            service_tax_detail: "",
            service_data: {
              service_tax_rag_no: "",
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
    this.payload[0].bank_data[0] = {
      bank_name: this.bankForm.get("name")?.value,
      bank_alias: this.bankForm.get("alias")?.value,
      mailing_data: {
        address: this.bankForm.get("address")?.value,
        state: this.bankForm.get("state")?.value,
        country: this.bankForm.get("country")?.value,
        pincode: this.bankForm.get("pincode")?.value,
        contact_no: this.bankForm.get("mobile")?.value,
        contact_person_data: {
          cnt_name: this.bankForm.get("contactName")?.value,
          cnt_phone_no: this.bankForm.get("mobile")?.value,
        },
      },
      bank_detail_data: {
        ac_holder_name: this.bankForm.get("acHolderName")?.value,
        ac_number: this.bankForm.get("acNumber")?.value,
        ifs_code: this.bankForm.get("ifscCode")?.value,
        swift_code: this.bankForm.get("swiftCode")?.value,
        branch_name: this.bankForm.get("bankName")?.value,
        branch: this.bankForm.get("branch")?.value,
        bsr: this.bankForm.get("bsrCode")?.value,
      },
      tax_data: {
        gstin_uin_no: this.bankForm.get("gstin")?.value,
        service_tax_detail: this.bankForm.get("serviceTaxDetails")?.value,
        service_data: {
          service_tax_rag_no: this.bankForm.get("serviceTaxNo")?.value,
        },
      },
      openning_balance: this.bankForm.get("openingBalance")?.value,
    };
  }

  addBankData() {
    this.isLoading = true;
    if (this.bankForm.get("name")?.value) {
      this.createPayload();
      this.apiService.addBankData(this.payload).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response._Object !== 0) {
            this.router.navigate(["/dashboard/payment/bank-list"], {
              queryParams: { reload: new Date().getTime() },
            });
            this.bankForm.reset();
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
      this.bankForm.markAllAsTouched();
    }
  }
}
