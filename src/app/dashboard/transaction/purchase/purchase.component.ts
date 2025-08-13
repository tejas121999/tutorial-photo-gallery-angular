import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
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
  add_item: boolean = false;
  add_more_ledgers: boolean = false;
  purchaseForm: FormGroup;
  supplierData: any[] = [];
  costCenter: any[] = [];
  purchaseLedger: any[] = [];
  stockItem: any[] = [];
  unitList: any[] = [];
  purchaseList: any[] = [];
  pageSize = 5;
  currentPage = 1;

  public data = ["CGST", "SGST", "IGST", "Round Off", "CGST", "SGST"];
  public results = [...this.data];

  addedItem: any[] = [];
  addLedger: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeData();
  }

  deleteItem(item: any) {
    this.addedItem = this.addedItem.filter((result) => result !== item);
  }

  removeLedger(index: number) {
    this.addLedger.splice(index, 1);
    this.ledgerDetailsArray.removeAt(index);
  }
  disableLager: boolean = true;
  editLedger(index: number) {
    // Implement your edit logic here
    this.disableLager = !this.disableLager;
  }

  get ledgerDetailsArray() {
    return this.purchaseForm.get("ledgerDetails") as FormArray;
  }

  get taxTypesFormArray() {
    return this.purchaseForm.controls.taxType as FormArray;
  }

  get totalPages() {
    return Math.ceil(this.results.length / this.pageSize) || 1;
  }

  get pagedResults() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.results.slice(start, start + this.pageSize);
  }

  // Add a trackBy function for ngFor
  trackResult(index: number, item: any) {
    return item;
  }

  changePage(direction: number) {
    const nextPage = this.currentPage + direction;
    if (nextPage >= 1 && nextPage <= this.totalPages) {
      this.currentPage = nextPage;
    }
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || "";
    this.results = this.data.filter((d) => d.toLowerCase().includes(query));
    this.purchaseForm.setControl(
      "taxType",
      this.fb.array(this.results.map(() => this.fb.control(false)))
    );
  }

  async initializeData() {
    this.purchaseForm = this.fb.group({
      changeMode: ["", Validators.required],
      purchaseNo: [""],
      supplierInvoiceNo: [""],
      date: [""],
      billDate: [""],
      partyName: [""],
      purchaseLedger: [""],
      costCenter: [""],
      item: [""],
      unit: [""],
      itemLedger: [""],
      itemRate: [""],
      itemQuantity: [""],
      itemAmount: [""],
      itemDiscount: [""],
      itemTaxableAmount: [""],
      itemTotalAmount: [""],
      taxType: this.fb.array(this.data.map(() => this.fb.control(false))),
      ledgerDetails: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
      this.getSupplierList();
      this.voucherTypePurchaseList();
      this.getCostCenterList();
      this.getStockItemList();
      this.getUnitSimpleList();
      this.getPurchaseAccountList();
    });
  }

  // Fetch supplier list from API
  async getSupplierList() {
    this.isLoading = true;
    const body = [
      {
        login_token: this.login_token,
        branch_token: this.branch_token,
        object_flag_tpd_id: 0,
        page_number: 0,
        page_size: 0,
      },
    ];
    this.apiService.getSupplierList(body).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response && response._Object && response._Object.length > 0) {
          this.supplierData = response?._Object;
        } else {
          this.supplierData = [];
        }
      },
      (error) => {
        console.error("Error fetching supplier list:", error);
        this.isLoading = false;
      }
    );
  }

  async voucherTypePurchaseList() {
    const body = [
      {
        login_token: this.login_token,
        branch_token: this.branch_token,
        object_flag_tpd_id: 0,
        page_number: 0,
        page_size: 0,
      },
    ];

    this.apiService.getVoucherTypePurchaseList(body).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response && response._Object && response._Object.length > 0) {
          this.purchaseLedger = response?._Object;
        } else {
          this.purchaseLedger = [];
        }
      },
      (error) => {
        console.error("Error fetching supplier list:", error);
        this.isLoading = false;
      }
    );
  }

  getCostCenterList() {
    var temp = [
      {
        login_token: this.login_token,
        branch_token: this.branch_token,
        object_flag_tpd_id: 0,
        page_number: 0,
        page_size: 0,
      },
    ];
    this.apiService.getCostCenterList(temp).subscribe(
      (response: any) => {
        if (response?._Object) {
          console.log("Cost Center List:", response._Object);
          this.costCenter = response?._Object;
          // this.filterByDate();
          // You can store the cost center list in a variable if needed
        } else {
          console.error("Invalid response format:", response);
        }
      },
      (error: any) => {
        console.error("Error fetching cost center list:", error);
      }
    );
  }

  async getStockItemList() {
    const body = [
      {
        login_token: await this.appPreference.get("_LoginToken"),
        branch_token: await this.appPreference.get("branch_token_id"),
        object_flag_tpd_id: 0,
        page_number: 0,
        page_size: 0,
      },
    ];
    this.apiService.getItemList(body).subscribe(
      (response: any) => {
        this.stockItem = response?._Object || [];

        // this.filterByDate();
      },
      (error) => {
        console.error("Error fetching stock item list:", error);
      }
    );
  }

  getUnitSimpleList() {
    var temp = [
      {
        login_token: this.login_token,
        branch_token: this.branch_token,
        object_flag_tpd_id: 0,
        page_number: 0,
        page_size: 0,
      },
    ];
    this.apiService.getUnitSimpleList(temp).subscribe(
      (response: any) => {
        console.log("Unit Simple List Response:", response?._Object);
        if (response && response?._Object) {
          // Handle the response as needed
          console.log("Unit Simple List:", response._Object);
          this.unitList = response._Object;
          // You can store the unit list in a variable if needed
        } else {
          console.error("Invalid response format:", response);
        }
      },
      (error) => {
        console.error("Error fetching unit simple list:", error);
      }
    );
  }

  async getPurchaseAccountList() {
    var temp = [
      {
        login_token: this.login_token,
        branch_token: this.branch_token,
        object_flag_tpd_id: 0,
      },
    ];
    console.log("temp", temp);
    this.apiService.getPurchaseList(temp).subscribe(
      (response: any) => {
        console.log("Tax List Response:", response?._Object);
        if (response && response?._Object) {
          this.purchaseList = response?._Object;
          // this.filterByDate();
        } else {
          console.error("Invalid response format:", response);
        }
      },
      (error) => {
        console.error("Error fetching tax list:", error);
      }
    );
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

  addItem() {
    var temp = {
      stock_item_name: this.purchaseForm.get("item")?.value,
      stock_item_unit_name: this.purchaseForm.get("unit")?.value,
      stock_ledger_name: this.purchaseForm.get("itemLedger")?.value,
      stock_item_rate: this.purchaseForm.get("itemRate")?.value,
      stock_item_qty: this.purchaseForm.get("itemQuantity")?.value,
      stock_item_amount: this.purchaseForm.get("itemAmount")?.value,
      stock_item_discount_amount: this.purchaseForm.get("itemDiscount")?.value,
      stock_item_taxable_amount:
        this.purchaseForm.get("itemTaxableAmount")?.value,
      stock_item_total_amount: this.purchaseForm.get("itemTotalAmount")?.value,
      stock_item_tax_detail: [],
      stock_item_total_tax_percentage: "",
      stock_item_total_tax_amount: "",
      stock_item_batch_detail: [],
    };
    this.addedItem.push(temp);

    this.add_item = false;
  }

  addLedgerData(data: any) {
    if (!this.addLedger.includes(data)) {
      this.addLedger.push(data);
      const ledgerGroup = this.fb.group({
        tax_name: [data],
        tax_percentage: [""],
        tax_amount: [""],
      });
      this.ledgerDetailsArray.push(ledgerGroup);
    }
  }

  cretePayload() {
    this.payload[0].login_token = this.login_token;
    this.payload[0].branch_token = this.branch_token;
    this.payload[0].tpd_status_tally_entity_type = "voucher";
    this.payload[0].tpd_status_data = "text";
    this.payload[0].tpd_status_report_id = 1;
    this.payload[0].tpd_status_report_data = "Test";
    this.payload[0].object_flag_tpd_id = 1;
    this.payload[0].voucher_data[0].voucher_inventory_detail = this.addedItem;
    this.payload[0].voucher_data[0] = {
      voucher_no: this.purchaseForm.get("purchaseNo")?.value,
      voucher_refference: this.purchaseForm.get("supplierInvoiceNo")?.value,
      voucher_date: this.purchaseForm.get("date")?.value,
      voucher_refference_date: this.purchaseForm.get("billDate")?.value,
      voucher_party_detail: {
        party_ledger_name: this.purchaseForm.get("partyName")?.value,
        voucher_mode: this.purchaseForm.get("changeMode")?.value,
      },
      voucher_inventory_detail: this.addedItem,
      voucher_inventory_tax_detail: this.ledgerDetailsArray.value,
    };
  }

  addPurchase() {
    this.isLoading = true;
    this.cretePayload();
    console.log("Payload:", this.payload);
    this.apiService.getPurchaseVoucherList(this.payload).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response._Object) {
          this.isLoading = false;
          this.router.navigate(["/dashboard/transaction/purchase-list"], {
            queryParams: { reload: new Date().getTime() },
          });
          this.purchaseForm.reset();
          this.addedItem = [];
          this.ledgerDetailsArray.clear();
        }
      },
      (error) => {
        this.isLoading = false;
        console.error("Error:", error);
      }
    );
  }
}
