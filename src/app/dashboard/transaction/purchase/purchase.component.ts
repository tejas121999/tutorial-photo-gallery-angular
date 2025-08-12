import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-purchase",
  templateUrl: "./purchase.component.html",
  styleUrls: ["./purchase.component.scss"],
})
export class PurchaseComponent implements OnInit {
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  purchaseForm: FormGroup;
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
    this.purchaseForm = this.fb.group({
      name: ["", Validators.required],
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
      tpd_status_tally_entity_type: "",
      tpd_status_data: "",
      tpd_status_report_id: "",
      tpd_status_report_data: "",
      object_flag_tpd_id: "",
      voucher_data: [
        {
          voucher_no: "",
          voucher_date: "",
          voucher_refference: "",
          voucher_refference_date: "",
          voucher_invenotry_detail: [
            {
              stock_item_name: "",
              stock_item_unit_name: "",
              stock_item_rate: "",
              stock_item_qty: "",
              stock_item_amount: "",
              stock_item_discount_amount: "",
              stock_item_taxable_amount: "",
              stock_item_tax_detail: [
                {
                  tax_amount: "",
                  tax_name: "",
                  tax_percentage: "",
                },
                {
                  tax_amount: "",
                  tax_name: "",
                  tax_percentage: "",
                },
              ],
              stock_item_total_tax_percentage: "",
              stock_item_total_tax_amount: "",
              stock_item_total_amount: "",
              stock_ledger_name: "",
              stock_item_batch_detail: [
                {
                  mrp: "",
                  batch_no: "",
                  item_code: "",
                  part_name: "",
                  part_number: "",
                  item_description: "",
                },
              ],
            },
          ],
          voucher_discount_detail: {
            stock_item_discount_name: "",
            stock_item_discount_amount: "",
            stock_bill_discount_name: "",
            stock_bill_discount_amount: "",
          },
          voucher_party_detail: {
            voucher_mode: "",
            address_type: "",
            buyer_bill_to: "",
            country: "",
            gst_reg_type: "",
            gstin_uin: "",
            mailing_address: "",
            party_ledger_name: "",
            place_of_supply: "",
            state: "",
          },
          voucher_bill_sundry_detail: [
            {
              bill_sundry_name: "",
              bill_sundry_type_id: "",
              bill_sundry_amount: "",
            },
            {
              bill_sundry_name: "",
              bill_sundry_type_id: "",
              bill_sundry_amount: "",
            },
          ],
          voucher_inventory_tax_detail: [
            {
              tax_amount: "",
              tax_name: "",
              tax_percentage: "",
            },
            {
              tax_amount: "",
              tax_name: "",
              tax_percentage: "",
            },
            {
              tax_amount: "",
              tax_name: "",
              tax_percentage: "",
            },
            {
              tax_amount: "",
              tax_name: "",
              tax_percentage: "",
            },
            {
              tax_amount: "",
              tax_name: "",
              tax_percentage: "",
            },
          ],
          voucher_tds_tax_detail: [
            {
              tax_amount: "",
              tax_name: "",
              tax_percentage: "",
            },
          ],
          voucher_tcs_tax_detail: [],
          voucher_narration: "",
          gross_total: "",
          discount_total: "",
          taxable_total: "",
          tax_total: "",
          bill_sundry_total: "",
          bill_amount: "",
          branch_detail: "",
          created_date: "",
          data_type: "",
          deleted_date: "",
          edited_date: "",
          inactive: false,
          inactive_name: "",
          org_detail: "",
          tdp_status_name: "",
          voucher_address: {
            billing_address: "",
            delivery_address: "",
            delivery_godown_address: "",
            godown_address: "",
          },
          voucher_group_code: "",
          voucher_group_name: "",
          voucher_type_name: "",
          voucherTypeCode: "",
        },
      ],
    },
  ];

  cretePayload() {
    this.payload[0].login_token = this.login_token;
    this.payload[0].branch_token = this.branch_token;
    this.payload[0].tpd_status_tally_entity_type = "voucher";
    this.payload[0].tpd_status_data = "text";
    this.payload[0].tpd_status_report_id = 1;
    this.payload[0].tpd_status_report_data = "Test";
    this.payload[0].object_flag_tpd_id = 1;
  }
}
