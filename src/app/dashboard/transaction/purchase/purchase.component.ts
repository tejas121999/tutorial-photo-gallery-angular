import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";
import { DataSharingService } from "src/app/services/data-sharing.service";
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
  // grossTotal: number = 0;
  // discountTotal: number = 0;
  // taxable: number = 0;
  // billAmount: number = 0;
  // totalAmount: number = 0;
  disableLager: boolean = true;

  public data = ["CGST", "SGST", "IGST", "Round Off", "CGST", "SGST"];
  public results = [...this.data];

  addedItem: any[] = [];
  addLedger: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService
  ) {
    this.purchaseForm = this.fb.group({
      changeMode: ["", Validators.required],
      purchaseNo: [""],
      supplierInvoiceNo: [""],
      date: [""],
      billDate: [""],
      partyName: [""],
      purchaseLedger: [""],
      costCenter: [""],
      narration: [""],
      item: [""],
      unit: [""],
      itemLedger: [""],
      itemRate: [""],
      itemQuantity: [""],
      itemAmount: [""],
      itemDiscount: [""],
      itemTaxableAmount: [""],
      itemTotalAmount: [""],
      lagers: this.fb.array([]),
      addedItem: this.fb.array([]),
      grossTotal: [0],
      discountTotal: [0],
      taxable: [0],
      billAmount: [0],
      totalAmount: [0],
    });

    this.dataSharingService?.currentData.subscribe((selectedItems) => {
      if (selectedItems && selectedItems.length > 0) {
        console.log("Selected Items:", selectedItems);
        this.addItems(selectedItems);
        // this.dataSharingService.updateData([]);
      }
    });

    this.dataSharingService?.currentLagersData.subscribe((selectedItems) => {
      if (selectedItems && selectedItems.length > 0) {
        console.log("Selected Ledgers:", selectedItems);
        this.addLagers(selectedItems);
        // this.dataSharingService.updateLagersData([]);
      }
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

    this.lagersFormArray.valueChanges.subscribe(() => {
      this.calculateTaxAndBillAmount();
    });
  }

  get itemFormArray() {
    return this.purchaseForm.get("addedItem") as FormArray;
  }

  get lagersFormArray() {
    return this.purchaseForm.get("lagers") as FormArray;
  }

  addLagers(data: any[]) {
    data.forEach((item) => {
      const lagersGroup = this.fb.group({
        ledger_name: [item.ledger_name],
        percentage: [""],
        amount: [""],
      });

      lagersGroup.get("percentage")?.valueChanges.subscribe((percentage) => {
        const grossTotal = this.purchaseForm.get("grossTotal")?.value || 0;
        if (percentage) {
          const calculatedAmount = grossTotal * (parseFloat(percentage) / 100);
          lagersGroup
            .get("amount")
            ?.setValue(calculatedAmount, { emitEvent: false });
        }
      });

      this.lagersFormArray.push(lagersGroup);
    });
    this.calculateTaxAndBillAmount();
  }

  addItems(data: any[]) {
    data.forEach((item) => {
      const itemGroup = this.fb.group({
        item_name: [item.item_name],
        unit_name: [item.unit_name],
        quantity: [item.quantity],
        amount: [item.amount],
      });
      this.itemFormArray.push(itemGroup);
    });
    this.calculateGrossTotal();
  }

  deleteItem(index: number) {
    this.itemFormArray.removeAt(index);
    this.addedItem.splice(index, 1);
    this.calculateGrossTotal();
  }

  deleteLager(index: number) {
    this.lagersFormArray.removeAt(index);
    this.addLedger.splice(index, 1);
    this.calculateTaxAndBillAmount();
  }

  editLager(index: number) {
    // Implement your edit logic here
    this.disableLager = !this.disableLager;
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
        if (response && response?._Object) {
          // Handle the response as needed
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
      login_token: null,
      branch_token: null,
      tpd_status_tally_entity_type: null,
      tpd_status_data: null,
      tpd_status_report_id: null,
      tpd_status_report_data: null,
      object_flag_tpd_id: null,
      voucher_data: [
        {
          voucher_no: null,
          voucher_date: null,
          voucher_refference: null,
          voucher_refference_date: null,
          voucher_invenotry_detail: [
            {
              stock_item_name: null,
              stock_item_unit_name: null,
              stock_item_rate: null,
              stock_item_qty: null,
              stock_item_amount: null,
              stock_item_discount_amount: null,
              stock_item_taxable_amount: null,
              stock_item_tax_detail: [
                {
                  tax_amount: null,
                  tax_name: null,
                  tax_percentage: null,
                },
                {
                  tax_amount: null,
                  tax_name: null,
                  tax_percentage: null,
                },
              ],
              stock_item_total_tax_percentage: null,
              stock_item_total_tax_amount: null,
              stock_item_total_amount: null,
              stock_ledger_name: null,
              stock_item_batch_detail: [
                {
                  mrp: null,
                  batch_no: null,
                  item_code: null,
                  part_name: null,
                  part_number: null,
                  item_description: null,
                },
              ],
            },
          ],
          voucher_discount_detail: {
            stock_item_discount_name: null,
            stock_item_discount_amount: null,
            stock_bill_discount_name: null,
            stock_bill_discount_amount: null,
          },
          voucher_party_detail: {
            voucher_mode: null,
            address_type: null,
            buyer_bill_to: null,
            country: null,
            gst_reg_type: null,
            gstin_uin: null,
            mailing_address: null,
            party_ledger_name: null,
            place_of_supply: null,
            state: null,
          },
          voucher_bill_sundry_detail: [
            {
              bill_sundry_name: null,
              bill_sundry_type_id: null,
              bill_sundry_amount: null,
            },
            {
              bill_sundry_name: null,
              bill_sundry_type_id: null,
              bill_sundry_amount: null,
            },
          ],
          voucher_inventory_tax_detail: [
            {
              tax_amount: null,
              tax_name: null,
              tax_percentage: null,
            },
            {
              tax_amount: null,
              tax_name: null,
              tax_percentage: null,
            },
            {
              tax_amount: null,
              tax_name: null,
              tax_percentage: null,
            },
            {
              tax_amount: null,
              tax_name: null,
              tax_percentage: null,
            },
            {
              tax_amount: null,
              tax_name: null,
              tax_percentage: null,
            },
          ],
          voucher_tds_tax_detail: [
            {
              tax_amount: null,
              tax_name: null,
              tax_percentage: null,
            },
          ],
          voucher_tcs_tax_detail: [],
          voucher_narration: null,
          gross_total: null,
          discount_total: null,
          taxable_total: null,
          tax_total: null,
          bill_sundry_total: null,
          bill_amount: null,
          branch_detail: null,
          created_date: null,
          data_type: null,
          deleted_date: null,
          edited_date: null,
          inactive: null,
          inactive_name: null,
          org_detail: null,
          tdp_status_name: null,
          voucher_address: {
            billing_address: null,
            delivery_address: null,
            delivery_godown_address: null,
            godown_address: null,
          },
          voucher_group_code: null,
          voucher_group_name: null,
          voucher_type_name: null,
          voucherTypeCode: null,
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

  addItem() {
    this.itemFormArray.value.forEach((element: any) => {
      console.log("Ledger:", element);
      var temp = {
        stock_item_name: element.item_name,
        stock_item_unit_name: element.unit_name,
        stock_item_qty: element.quantity,
        stock_item_amount: element.amount,
        stock_item_tax_detail: [],
        stock_item_total_tax_percentage: "",
        stock_item_total_tax_amount: "",
        stock_item_batch_detail: [],
      };
      this.addedItem.push(temp);
    });
    this.add_item = false;
  }

  addLager() {
    this.lagersFormArray.value.forEach((element: any) => {
      var temp = {
        tax_amount: element.amount,
        tax_name: element.name,
        tax_percentage: element.percentage,
      };
      this.addLedger.push(temp);
    });
  }

  cretePayload() {
    this.addItem();
    this.addLager();
    this.payload[0].login_token = this.login_token;
    this.payload[0].branch_token = this.branch_token;
    this.payload[0].tpd_status_tally_entity_type = "voucher";
    this.payload[0].tpd_status_data = "text";
    this.payload[0].tpd_status_report_id = 1;
    this.payload[0].tpd_status_report_data = "Test";
    this.payload[0].object_flag_tpd_id = 1;
    this.payload[0].voucher_data[0].voucher_party_detail.voucher_mode =
      this.purchaseForm.get("changeMode")?.value;
    this.payload[0].voucher_data[0].voucher_type_name =
      this.purchaseForm.get("purchaseLedger")?.value;
    this.payload[0].voucher_data[0].voucher_no =
      this.purchaseForm.get("purchaseNo")?.value;
    this.payload[0].voucher_data[0].voucher_refference =
      this.purchaseForm.get("supplierInvoiceNo")?.value;
    this.payload[0].voucher_data[0].voucher_date =
      this.purchaseForm.get("date")?.value;
    this.payload[0].voucher_data[0].voucher_refference_date =
      this.purchaseForm.get("billDate")?.value;
    this.payload[0].voucher_data[0].voucher_party_detail.party_ledger_name =
      this.purchaseForm.get("partyName")?.value;
    this.payload[0].voucher_data[0].voucher_invenotry_detail = this.addedItem;
    this.payload[0].voucher_data[0].voucher_inventory_tax_detail =
      this.addLedger;
    this.payload[0].voucher_data[0].voucher_narration =
      this.purchaseForm.get("narration")?.value;
    this.payload[0].voucher_data[0].gross_total =
      this.purchaseForm.get("grossTotal")?.value;
    this.payload[0].voucher_data[0].discount_total =
      this.purchaseForm.get("discountTotal")?.value;
    this.payload[0].voucher_data[0].taxable_total =
      this.purchaseForm.get("taxableTotal")?.value;
    this.payload[0].voucher_data[0].bill_amount =
      this.purchaseForm.get("billAmount")?.value;
    this.payload[0].voucher_data[0].voucherTypeCode = "PUR";
  }

  addPurchase() {
    this.isLoading = true;
    this.resetPayloadValuesToNull(this.payload);
    this.cretePayload();
    console.log("Payload:", this.payload);
    this.apiService.addPurchaseVoucherData(this.payload).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response._Object) {
          this.isLoading = false;
          this.router.navigate(["/dashboard/transaction/purchase-list"], {
            queryParams: { reload: new Date().getTime() },
          });
          this.purchaseForm.reset();
          this.addedItem = [];
        }
      },
      (error) => {
        this.isLoading = false;
        console.error("Error:", error);
      }
    );
  }

  calculateGrossTotal() {
    const total = this.itemFormArray.value.reduce((sum: number, item: any) => {
      const amount =
        typeof item.amount === "string" ? parseFloat(item.amount) : item.amount;
      return sum + (amount || 0);
    }, 0);
    this.purchaseForm.patchValue({ grossTotal: total });
    this.calculateTaxAndBillAmount();
  }

  calculateTaxAndBillAmount() {
    const grossTotal = this.purchaseForm.get("grossTotal")?.value || 0;
    const ledgers = this.lagersFormArray.value;

    const totalPercentage = ledgers.reduce((sum: number, ledger: any) => {
      const percentage =
        typeof ledger.percentage === "string"
          ? parseFloat(ledger.percentage)
          : ledger.percentage;
      return sum + (percentage || 0);
    }, 0);

    const taxableAmount = grossTotal * (totalPercentage / 100);
    const billAmount = grossTotal + taxableAmount;

    this.purchaseForm.patchValue({
      taxable: taxableAmount,
      billAmount: billAmount,
      totalAmount: billAmount,
    });
  }
}
