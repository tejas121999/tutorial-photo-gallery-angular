import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-voucher-type",
  templateUrl: "./voucher-type.component.html",
  styleUrls: ["./voucher-type.component.scss"],
})
export class VoucherTypeComponent {
  voucherTypeForm: FormGroup;
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  voucherTypes: any[] = [
    { name: "Sales", value: "sales_data", key: "sales_name" },
    { name: "Purchase", value: "purchase_data", key: "purchase_name" },
    { name: "Sales order", value: "sales_order_data", key: "sales_order_name" },
    {
      name: "Purchase order",
      value: "purchase_order_data",
      key: "purchase_order_name",
    },
    { name: "Credit note", value: "credit_not_data", key: "credit_not_name" },
    { name: "Debit note", value: "debit_not_data", key: "debit_not_name" },
    { name: "Journal", value: "journal_data", key: "journal_name" },
    {
      name: "Delivery Note",
      value: "delivery_note_data",
      key: "delivery_note_name",
    },
    { name: "Payment", value: "payment_data", key: "payment_name" },
    { name: "Receipt", value: "receipt_data", key: "receipt_name" },
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

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
    });
  }

  async initializeData() {
    this.voucherTypeForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      alias: [""],
      voucherType: ["", Validators.required],
      abbreviation: [""],
      activeVoucher: ["Yes"],
      voucherNumberingMethod: [""],
      preventingDuplicateVoucherCreation: ["Yes"],
      additionalNumberingDetails: [""],
      numberingBehavior: [""],
      retainOriginalVoucherNo: [""],
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
    // Find the key from voucherTypes array using the selected voucherType value
    const selectedVoucherType = this.voucherTypeForm.value.voucherType;
    const foundType = this.voucherTypes.find(
      (type) => type.value === selectedVoucherType
    );
    const voucherTypeKey = foundType ? foundType.key : null;
    // You can now use voucherTypeKey as needed
    this.payload[0][selectedVoucherType] = [
      {
        [voucherTypeKey]: this.voucherTypeForm.get("name")?.value,
      },
    ];
  }

  createVoucherType() {
    this.isLoading = true;
    if (
      this.voucherTypeForm.get("name")?.value &&
      this.voucherTypeForm.get("voucherType")?.value
    ) {
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      console.log("Payload:", this.payload);
      const selectedVoucherType = this.voucherTypeForm.value.voucherType;
      if (selectedVoucherType === "sales_data") {
        this.apiService.addVTSalesData(this.payload).subscribe(
          (response) => {
            this.isLoading = false;
            console.log("Sales data added successfully:", response);
            this.router.navigate(["/dashboard/master/voucher-type-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          },
          (error) => {
            this.isLoading = false;
            console.error("Error adding sales data:", error);
          }
        );
      }
      if (selectedVoucherType === "purchase_data") {
        this.apiService.addVTPurchaseData(this.payload).subscribe(
          (response) => {
            this.isLoading = false;
            console.log("Purchase data added successfully:", response);
            this.router.navigate(["/dashboard/master/voucher-type-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          },
          (error) => {
            this.isLoading = false;
            console.error("Error adding purchase data:", error);
          }
        );
      }
      if (selectedVoucherType === "sales_order_data") {
        this.apiService.addVTSalesOrderData(this.payload).subscribe(
          (response) => {
            this.isLoading = false;
            console.log("Sales order data added successfully:", response);
            this.router.navigate(["/dashboard/master/voucher-type-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          },
          (error) => {
            this.isLoading = false;
            console.error("Error adding sales order data:", error);
          }
        );
      }
      if (selectedVoucherType === "purchase_order_data") {
        this.apiService.addVTPurchaseOrderData(this.payload).subscribe(
          (response) => {
            this.isLoading = false;
            console.log("Purchase order data added successfully:", response);
            this.router.navigate(["/dashboard/master/voucher-type-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          },
          (error) => {
            this.isLoading = false;
            console.error("Error adding purchase order data:", error);
          }
        );
      }
      if (selectedVoucherType === "credit_not_data") {
        this.apiService.addVTCreditNotData(this.payload).subscribe(
          (response) => {
            this.isLoading = false;
            console.log("Credit note data added successfully:", response);
            this.router.navigate(["/dashboard/master/voucher-type-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          },
          (error) => {
            this.isLoading = false;
            console.error("Error adding credit note data:", error);
          }
        );
      }
      if (selectedVoucherType === "debit_not_data") {
        this.apiService.addVTDebitNotData(this.payload).subscribe(
          (response) => {
            this.isLoading = false;
            console.log("Debit note data added successfully:", response);
            this.router.navigate(["/dashboard/master/voucher-type-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          },
          (error) => {
            this.isLoading = false;
            console.error("Error adding debit note data:", error);
          }
        );
      }
      if (selectedVoucherType === "journal_data") {
        this.apiService.addVTJournalData(this.payload).subscribe(
          (response) => {
            this.isLoading = false;
            console.log("Journal data added successfully:", response);
            this.router.navigate(["/dashboard/master/voucher-type-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          },
          (error) => {
            this.isLoading = false;
            console.error("Error adding journal data:", error);
          }
        );
      }
      if (selectedVoucherType === "delivery_note_data") {
        this.apiService.addVTDeliveryNoteData(this.payload).subscribe(
          (response) => {
            this.isLoading = false;
            console.log("Delivery note data added successfully:", response);
            this.router.navigate(["/dashboard/master/voucher-type-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          },
          (error) => {
            this.isLoading = false;
            console.error("Error adding delivery note data:", error);
          }
        );
      }
      if (selectedVoucherType === "payment_data") {
        this.apiService.addVTPaymentData(this.payload).subscribe(
          (response) => {
            this.isLoading = false;
            console.log("Payment data added successfully:", response);
            this.router.navigate(["/dashboard/master/voucher-type-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          },
          (error) => {
            this.isLoading = false;
            console.error("Error adding payment data:", error);
          }
        );
      }
      if (selectedVoucherType === "receipt_data") {
        this.apiService.addVTReceiptData(this.payload).subscribe(
          (response) => {
            this.isLoading = false;
            console.log("Receipt data added successfully:", response);
            this.router.navigate(["/dashboard/master/voucher-type-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          },
          (error) => {
            this.isLoading = false;
            console.error("Error adding receipt data:", error);
          }
        );
      }
    } else {
      this.isLoading = false;
      this.voucherTypeForm.markAllAsTouched();
    }
  }
}
