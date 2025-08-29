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
  pageSize = 15;
  currentPage = 1;
  disableLager: boolean = true;

  public data = ["CGST", "SGST", "IGST", "Round Off", "CGST", "SGST"];
  public results = [...this.data];

  addedItem: any[] = [];
  addLedger: any[] = [];
  addSundryData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService
  ) {
    console.log("data");
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
      voucherBillSundryDetail: this.fb.array([]),
      grossTotal: [0],
      discountTotal: [0],
      taxable: [0],
      billAmount: [0],
      billingSundryAmount: [0],
      totalAmount: [0],
    });

    this.dataSharingService?.currentData.subscribe((selectedItems) => {
      if (selectedItems && selectedItems.length > 0) {
        console.log("Selected Items:", selectedItems);
        this.addItems(selectedItems);
      }
    });

    this.dataSharingService?.currentLagersData.subscribe((selectedItems) => {
      if (selectedItems && selectedItems.length > 0) {
        console.log("Selected Ledgers:", selectedItems);
        this.addLagers(selectedItems);
      }
    });

    this.dataSharingService?.currentBillSandryDetailsData.subscribe(
      (selectedItems) => {
        if (selectedItems && selectedItems.length > 0) {
          console.log("Selected Bill Sundry Details:", selectedItems);
          this.addBillSundryDetails(selectedItems);
        }
      }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query Params:", this.route.snapshot.queryParams);
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

    this.billSundryDetailsFormArray.valueChanges.subscribe(() => {
      this.calculateBillingSundryAmount();
    });

    this.itemFormArray.valueChanges.subscribe(() => {
      this.calculateGrossTotal();
    });
  }

  get itemFormArray() {
    return this.purchaseForm.get("addedItem") as FormArray;
  }

  get lagersFormArray() {
    return this.purchaseForm.get("lagers") as FormArray;
  }

  get billSundryDetailsFormArray() {
    return this.purchaseForm.get("voucherBillSundryDetail") as FormArray;
  }

  bill_sundry: any = [
    { id: 1, name: "Round Off Add" },
    { id: 2, name: "Round Off Less" },
  ];

  addBillSundryDetails(data: any[]) {
    data.forEach((item) => {
      const billSundryGroup = this.fb.group({
        bill_sundry_name: [item.ledger_name],
        bill_sundry_type_id: [""],
        bill_sundry_amount: [""],
      });
      billSundryGroup.get("bill_sundry_amount")?.valueChanges.subscribe(() => {
        this.calculateBillingSundryAmount();
      });
      this.billSundryDetailsFormArray.push(billSundryGroup);
    });
  }

  addLagers(data: any[]) {
    data.forEach((item) => {
      const lagersGroup = this.fb.group({
        ledger_name: [item.ledger_name],
        percentage: ["", [Validators.max(99)]],
        amount: [""],
      });

      lagersGroup.get("percentage")?.valueChanges.subscribe((percentage) => {
        const grossTotal = this.purchaseForm.get("grossTotal")?.value || 0;
        if (percentage) {
          const calculatedAmount = grossTotal * (parseFloat(percentage) / 100);
          console.log("Calculated Lager Amount:", calculatedAmount);
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
    data.forEach((item: any) => {
      const itemGroup = this.fb.group({
        item_name: [item.item_name],
        unit_name:
          item.unit_name !== null && item.unit_name !== undefined
            ? item.unit_name
            : [""],
        select_item_ledgers: [""],
        quantity: [item.quantity],
        amount:
          item.amount !== null && item.amount !== undefined
            ? item.amount
            : [""],
      });

      itemGroup.get("amount")?.valueChanges.subscribe(() => {
        this.calculateGrossTotal();
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
      // tpd_status_data: null,    // this field is not there in payload
      tpd_status_report_id: null,
      tpd_status_report_data: null,
      object_flag_tpd_id: null,
      voucher_data: [
        {
          voucher_no: "",
          voucher_date: "",
          voucher_refference_detail: [],
          voucher_refference: "",
          voucher_refference_date: "",
          voucherTypeCode: "",
          voucher_type_id: 0,
          voucher_type_name: "",
          voucher_config_detail: {
            cost_centre_name: "",
            ledger_auto_create: 0,
            item_auto_create: 0,
            voucher_mode_type_id: 2,
          },
          voucher_invenotry_detail: [],
          voucher_discount_detail: {
            stock_item_discount_id: 0,
            stock_item_discount_name: "",
            stock_item_discount_amount: 0,
            stock_bill_discount_id: 0,
            stock_bill_discount_name: "",
            stock_bill_discount_amount: 0,
          },
          voucher_inventory_tax_detail: [],
          voucher_tcs_tax_detail: [],
          voucher_vat_tax_detail: [],
          voucher_tds_tax_detail: [],
          voucher_bill_sundry_detail: [],
          voucher_ledger_id: 0,
          voucher_party_detail: {
            party_ledger_id: 0,
            party_ledger_name: "",
            buyer_bill_to: "",
            address_type: "",
            mailing_address: "",
            state: "",
            country: "",
            gst_reg_type: "",
            gstin_uin: "",
            place_of_supply: "",
          },
          voucher_narration: "",
          voucher_address: {
            billing_address: "",
            godown_address: "",
            delivery_address: "",
            delivery_godown_address: "",
          },
          gross_total: "",
          discount_total: "",
          taxable_total: "",
          tax_total: 0,
          bill_sundry_total: "",
          bill_amount: "",
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

  addSundry() {
    this.billSundryDetailsFormArray.value.forEach((element: any) => {
      console.log("Element:", element);
      var temp = {
        // bill_sundry_id: 0,
        bill_sundry_name: element.bill_sundry_name,
        bill_sundry_type_id: element.bill_sundry_type_id,
        bill_sundry_amount: element.bill_sundry_amount,
      };
      this.addSundryData.push(temp);
    });
    console.log("Sundry Data:", this.addSundryData);
    this.purchaseForm
      .get("voucherBillSundryDetail")
      ?.setValue(this.addSundryData);
    // this.addSundryData = [];
  }

  addItem() {
    this.itemFormArray.value.forEach((element: any) => {
      var temp = {
        stock_item_id: 0,
        stock_item_description_detail: [],
        stock_item_name: element.item_name,
        stock_item_unit_id: 0,
        stock_item_unit_name: element.unit_name,
        stock_item_rate: 0,
        stock_item_qty: Number(element.quantity) || 0,
        stock_item_amount: Number(element.amount) || 0,
        stock_item_discount_percentage: 0,
        stock_item_taxable_amount: Number(element.amount) || 0,
        stock_item_tax_detail: [],
        stock_item_total_tax_percentage: 0,
        stock_item_total_tax_amount: 0,
        stock_item_total_amount: Number(element.amount) || 0,
        stock_ledger_id: element.select_item_ledgers, // fetch from data
        stock_ledger_name:
          this.purchaseList.find(
            (p) => p.ledger_id === element.select_item_ledgers
          )?.ledger_name || "", // fetch from data
        stock_item_batch_detail: [
          {
            batch_no: "",
            expired_date: "",
            mf_date: "",
            mrp: 0,
            mrp_date: "",
            mrp_state: 0,
            mrp_country: 0,
            part_number: "",
            part_name: "",
            item_description: "",
            item_godown: "",
          },
        ],
      };
      this.addedItem.push(temp);
    });
    console.log("Added Items:", this.addedItem);
    this.add_item = false;
  }

  addLager() {
    this.lagersFormArray.value.forEach((element: any) => {
      var temp = {
        tax_amount: element.amount,
        tax_name: element.ledger_name,
        tax_percentage: element.percentage,
      };
      this.addLedger.push(temp);
    });
    console.log("Added Ledgers:", this.addLedger);
  }
  // voucher_mode is missing in the updated payload
  cretePayload() {
    this.addItem();
    this.addLager();
    this.addSundry();
    this.payload[0].login_token = this.login_token;
    this.payload[0].branch_token = this.branch_token;
    this.payload[0].tpd_status_tally_entity_type = "voucher";
    this.payload[0].tpd_status_report_id = 1;
    this.payload[0].tpd_status_report_data = "Test";
    this.payload[0].object_flag_tpd_id = 1;
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
    this.payload[0].voucher_data[0].voucher_bill_sundry_detail =
      this.addSundryData;
    this.payload[0].voucher_data[0].voucher_narration =
      this.purchaseForm.get("narration")?.value;
    this.payload[0].voucher_data[0].gross_total =
      this.purchaseForm.get("grossTotal")?.value || 0;
    this.payload[0].voucher_data[0].discount_total =
      this.purchaseForm.get("discountTotal")?.value || 0;
    this.payload[0].voucher_data[0].taxable_total =
      this.purchaseForm.get("taxable")?.value || 0;
    this.payload[0].voucher_data[0].bill_amount =
      this.purchaseForm.get("billAmount")?.value || 0;
    this.payload[0].voucher_data[0].bill_sundry_total =
      this.purchaseForm.get("billingSundryAmount")?.value || 0;
    this.payload[0].voucher_data[0].voucherTypeCode = "PUR";
  }

  addPurchase() {
    this.isLoading = true;
    // this.resetPayloadValuesToNull(this.payload);
    this.cretePayload();
    console.log("Payload:", this.payload);
    this.apiService.addPurchaseVoucherData(this.payload).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response._Object) {
          this.clearFormAndArrays();
          this.isLoading = false;
          this.router.navigate(["/dashboard/transaction/purchase-list"], {
            queryParams: { reload: new Date().getTime() },
          });
        }
      },
      (error) => {
        this.isLoading = false;
        console.error("Error:", error);
      }
    );
  }

  private clearFormAndArrays() {
    this.purchaseForm.reset({
      changeMode: "",
      purchaseNo: "",
      supplierInvoiceNo: "",
      date: "",
      billDate: "",
      partyName: "",
      purchaseLedger: "",
      costCenter: "",
      narration: "",
      item: "",
      unit: "",
      itemLedger: "",
      itemRate: "",
      itemQuantity: "",
      itemAmount: "",
      itemDiscount: "",
      itemTaxableAmount: "",
      itemTotalAmount: "",
      grossTotal: 0,
      discountTotal: 0,
      taxable: 0,
      billAmount: 0,
      billingSundryAmount: 0,
      totalAmount: 0,
    });

    this.clearFormArray(this.lagersFormArray);
    this.clearFormArray(this.itemFormArray);
    this.clearFormArray(this.billSundryDetailsFormArray);

    this.addedItem = [];
    this.addLedger = [];
    this.addSundryData = [];

    // Clear shared selections to prevent immediate repopulation via subscriptions
    this.dataSharingService.changeData([]);
    this.dataSharingService.changeLagersData([]);
    this.dataSharingService.changeBillSandryDetailsData([]);
  }

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
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
    const billingSundryAmount =
      this.purchaseForm.get("billingSundryAmount")?.value || 0;

    const totalPercentage = ledgers.reduce((sum: number, ledger: any) => {
      const percentage =
        typeof ledger.percentage === "string"
          ? parseFloat(ledger.percentage)
          : ledger.percentage;
      return sum + (percentage || 0);
    }, 0);

    const taxableAmount = grossTotal * (totalPercentage / 100);
    const billAmount = grossTotal + taxableAmount + billingSundryAmount;

    this.purchaseForm.patchValue({
      taxable: taxableAmount,
      billAmount: billAmount,
      totalAmount: billAmount,
    });
  }

  calculateBillingSundryAmount() {
    const billSundryDetails = this.billSundryDetailsFormArray.value;
    let totalBillingSundryAmount = 0;

    billSundryDetails.forEach((item: any) => {
      const amount =
        typeof item.bill_sundry_amount === "string"
          ? parseFloat(item.bill_sundry_amount)
          : item.bill_sundry_amount;
      if (item.bill_sundry_type_id === 1) {
        totalBillingSundryAmount += amount || 0;
      } else if (item.bill_sundry_type_id === 2) {
        totalBillingSundryAmount -= amount || 0;
      }
    });

    this.purchaseForm.patchValue({
      billingSundryAmount: totalBillingSundryAmount,
    });
    this.calculateTaxAndBillAmount();
  }
}
