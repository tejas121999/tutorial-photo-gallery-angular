import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";
@Component({
  selector: "app-stock-item",
  templateUrl: "./stock-item.component.html",
  styleUrls: ["./stock-item.component.scss"],
})
export class StockItemComponent implements OnInit {
  setComponentsBOM: boolean = false;
  setMRPDetails: boolean = false;
  rateOfDuty: boolean = false;
  setStandardRates: boolean = false;
  stockItemForm: FormGroup;
  additionalDetailsForm: FormGroup;
  showAdditionalDetails: boolean = false;
  checkboxes: any;
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  itemGroupList: any[] = [];
  itemCategoryList: any[] = [];
  unitList: any[] = [];

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
      this.getItemGroupList();
      this.getItemCategoryList();
      this.getUnitSimpleList();
    });
    // this.getTaxList();
  }

  async initializeData() {
    this.stockItemForm = this.fb.group({
      name: ["", Validators.required],
      under: [""],
      category: [""],
      unit: [""],
      alternateUnit: ["Not Applicable"],
      gstApplicable: ["Not Applicable"],
      HSNDetails: [""],
      hsn: [""],
      description: [""],
      gstRateDetails: [""],
      taxabilityType: [""],
      supplyType: [""],
      gstRate: [""],
      cessValuation: ["Not Applicable"],
      cessRate: [""],
      cessRateValue: [""],
      cessRateUnit: [""],
      openingBalance: [""],
      quantity: [""],
      rate: [""],
      value: [""],
    });
    this.additionalDetailsForm = this.fb.group({
      maintainInBatches: [false],
      trackDateOfManufacture: [false],
      useExpiryDates: [false],
      enableCostTracking: [false],
      isInclusiveOfDutiesAndTaxes: [false],
      setComponentsBOM: [false],
      bomName: [""],
      componentName: [""],
      manufacturingUnit: [""],
      item: [""],
      godown: [""],
      quantity: [""],
      setMRPDetails: [false],
      quantityMRP: [""],
      setStandardRates: [false],
      standardCostDate: [""],
      standardCostRate: [""],
      standardSellingPriceDate: [""],
      standardSellingPriceRate: [""],
      rateOfDuty: [false],
      rate: [""],
    });
  }

  payload: any = [
    {
      login_token: null,
      branch_token: null,
      tpd_status_tally_entity_type: null,
      object_flag_tpd_id: null,
      item_data: [
        {
          item_name: null,
          alias_name: null,
          unit_name: null,
          part_no: null,
          description_item: null,
          item_notes: null,
          default_ledger_for_invoice: null,
          default_ledger_invoice: [
            {
              ledger_item_name: null,
              tax_classes: null,
              percentage: null,
              rounding_method: null,
              rounding_limit: null,
            },
          ],
          item_under: null,
          item_category: null,
          alternate_unit: null,
          additional_detail: {
            maintain_in_batch: {
              truck_date_of_manufacturing: null,
              expiry_date: null,
            },
            set_Bom: "",
            standard_rate: "",
            standar_rate_data: {
              standard_cost_data: [
                {
                  app_from: null,
                  rate: null,
                  percentage: null,
                },
              ],
              standard_selling_price_data: [
                {
                  app_from: null,
                  rate: null,
                  percentage: null,
                },
              ],
            },
            costing_method: null,
            valuation_method: null,
            provide_behavious_option: null,
            provide_behavious_data: {
              physical_counting: null,
              negative_balance: null,
              new_manufature: null,
              consumed: null,
              inward_as_scrap: null,
              voucher_entry: null,
            },
          },
          statutory_detail_data: {
            gst_aplicability: null,
            hsns_sac_data: {
              hsn_sac_detail: null,
              classification_create_data: {
                classification_name: null,
                hsn_detail_data: {
                  hsn_sac_detail: null,
                  hsn_sac: null,
                  desription: null,
                },
                gst_rate_related_detail_data: {
                  gst_detail: null,
                  specify_slab_based_rate: {
                    create_item_data: [
                      {
                        greater_than: null,
                        igst_rate: null,
                        cgst_rate: null,
                        sgst_utgst_rate: null,
                      },
                    ],
                    cess_gst_detail_data: {
                      cess_rate: null,
                      cess_unit: null,
                    },
                    additionaldetail_data: {
                      eligiable_for_taxable_credit: null,
                    },
                  },
                  taxtability_type: null,
                },
              },
            },
            gst_rate_data: {
              gst_Detail: null,
              specify_slab_based_rule: {
                create_item_data: [
                  {
                    greater_than: null,
                    igst_rate: null,
                    cgst_rate: null,
                    sgst_utgst_rate: null,
                  },
                ],
                cess_gst_detail_data: {
                  cess_rate: null,
                  cess_unit: null,
                },
                additionaldetail_data: {
                  eligiable_for_taxable_credit: null,
                },
              },
              taxtability_type: null,
              type_of_suppile: null,
              other_statutory_details: null,
              other_statutor_detail_data: {
                excise_applicable: null,
                excise_data: {
                  excise_apllicable: null,
                  alter_excise_detail: null,
                  alter_excise_triff_data: {
                    triff_name: null,
                    hsn_code: null,
                    reporting_unit: null,
                    valuation_type: null,
                    rate: null,
                  },
                },
                vat_applicable: null,
                vat_data: {
                  vat_detail: null,
                  vat_detail_data: {
                    tax_rate: null,
                    additional_type: null,
                    tax_type: null,
                  },
                  conversion_factor: {
                    item: null,
                    list_of_unit: null,
                    unit: null,
                    unit_type: null,
                  },
                },
                tcs_applicable: null,
                tcs_nature_of_goods: null,
                tcs_data: {
                  tcs_name_nature: null,
                  section: null,
                  payment_code: null,
                  rate_individuals_data: {
                    with_pan: null,
                    without_pan: null,
                  },
                  collectee_type_data: {
                    with_pan: null,
                    without_pan: null,
                  },
                  is_zero_related: null,
                  tax_calculation_based_on_realisation: null,
                  exemption_limit: null,
                },
              },
            },
          },
          openning_balance: null,
          allocation_data: {
            godowan_name: null,
            batch: null,
            mfg_date: null,
            expiry_date: null,
            mrp: null,
            mrp_date: null,
            mrp_state: null,
            mrp_country: null,
            quantity: null,
            rate: null,
            percentage: null,
            amount: null,
          },
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
    this.payload[0].tpd_status_tally_entity_type = "StockItem";
    this.payload[0].object_flag_tpd_id = 1;
    this.payload[0].login_token = this.login_token;
    this.payload[0].branch_token = this.branch_token;
    this.payload[0].item_data[0].item_name =
      this.stockItemForm.get("name")?.value;
    this.payload[0].item_data[0].item_under =
      this.stockItemForm.get("under")?.value;
    this.payload[0].item_data[0].item_category =
      this.stockItemForm.get("category")?.value;
    this.payload[0].item_data[0].alternate_unit =
      this.stockItemForm.get("alternateUnit")?.value;
    this.payload[0].item_data[0].statutory_detail_data.gst_aplicability =
      this.stockItemForm.get("gstApplicable")?.value;
    this.payload[0].item_data[0].statutory_detail_data.hsns_sac_data.hsn_sac_detail =
      this.stockItemForm.get("HSNDetails")?.value;
    this.payload[0].item_data[0].statutory_detail_data.hsns_sac_data.classification_create_data.hsn_detail_data.hsn_sac_detail =
      this.stockItemForm.get("hsn")?.value;
    this.payload[0].item_data[0].statutory_detail_data.hsns_sac_data.classification_create_data.hsn_detail_data.desription =
      this.stockItemForm.get("description")?.value;
    this.payload[0].item_data[0].statutory_detail_data.hsns_sac_data.classification_create_data.gst_rate_related_detail_data.gst_detail =
      this.stockItemForm.get("gstRateDetails")?.value;
    this.payload[0].item_data[0].unit_name =
      this.stockItemForm.get("unit")?.value;
    // Ensure all nested objects exist before setting cess_rate and cess_unit
    const hsns =
      this.payload[0].item_data[0].statutory_detail_data.hsns_sac_data;
    if (
      hsns &&
      hsns.classification_create_data &&
      hsns.classification_create_data.gst_rate_related_detail_data
    ) {
      if (
        !hsns.classification_create_data.gst_rate_related_detail_data
          .cess_gst_detail_data
      ) {
        hsns.classification_create_data.gst_rate_related_detail_data.cess_gst_detail_data =
          {};
      }
      hsns.classification_create_data.gst_rate_related_detail_data.cess_gst_detail_data.cess_rate =
        this.stockItemForm.get("cessRateValue")?.value;
      hsns.classification_create_data.gst_rate_related_detail_data.cess_gst_detail_data.cess_unit =
        this.stockItemForm.get("cessRateUnit")?.value;
    }
    this.payload[0].item_data[0].statutory_detail_data.hsns_sac_data.classification_create_data.gst_rate_related_detail_data.taxtability_type =
      this.stockItemForm.get("taxabilityType")?.value;
    // Ensure all nested objects exist before setting reporting_unit
    const gstRateData =
      this.payload[0].item_data[0].statutory_detail_data.gst_rate_data;
    if (!gstRateData.other_statutor_detail_data) {
      gstRateData.other_statutor_detail_data = {};
    }
    if (!gstRateData.other_statutor_detail_data.excise_data) {
      gstRateData.other_statutor_detail_data.excise_data = {};
    }
    if (!gstRateData.other_statutor_detail_data.excise_data.excise_data) {
      gstRateData.other_statutor_detail_data.excise_data.excise_data = {};
    }
    if (
      !gstRateData.other_statutor_detail_data.excise_data.excise_data
        .alter_excise_triff_data
    ) {
      gstRateData.other_statutor_detail_data.excise_data.excise_data.alter_excise_triff_data =
        {};
    }
    gstRateData.other_statutor_detail_data.excise_data.excise_data.alter_excise_triff_data.reporting_unit =
      this.stockItemForm.get("unit")?.value;
    this.payload[0].item_data[0].statutory_detail_data.gst_rate_data.gst_Detail =
      this.stockItemForm.get("gstRateDetails")?.value;
    this.payload[0].item_data[0].statutory_detail_data.gst_rate_data.specify_slab_based_rule.cess_gst_detail_data.cess_rate =
      this.stockItemForm.get("cessRateValue")?.value;
    this.payload[0].item_data[0].statutory_detail_data.gst_rate_data.specify_slab_based_rule.cess_gst_detail_data.cess_unit =
      this.stockItemForm.get("cessRateUnit")?.value;
    this.payload[0].item_data[0].statutory_detail_data.gst_rate_data.taxtability_type =
      this.stockItemForm.get("taxabilityType")?.value;
    this.payload[0].item_data[0].statutory_detail_data.gst_rate_data.type_of_suppile =
      this.stockItemForm.get("supplyType")?.value;
    this.payload[0].item_data[0].additional_detail.maintain_in_batch.truck_date_of_manufacturing =
      this.additionalDetailsForm.get("trackDateOfManufacture")?.value;
    this.payload[0].item_data[0].additional_detail.maintain_in_batch.expiry_date =
      this.additionalDetailsForm.get("useExpiryDates")?.value;
    if (this.additionalDetailsForm.get("setComponentsBOM")?.value === true) {
      this.payload[0].item_data[0].additional_detail.set_Bom = JSON.stringify({
        bomName: this.additionalDetailsForm.get("bomName")?.value,
        componentName: this.additionalDetailsForm.get("componentName")?.value,
        manufacturingUnit:
          this.additionalDetailsForm.get("manufacturingUnit")?.value,
        item: this.additionalDetailsForm.get("item")?.value,
        godown: this.additionalDetailsForm.get("godown")?.value,
        quantity: this.additionalDetailsForm.get("quantity")?.value,
      });
    }
    if (this.additionalDetailsForm.get("setStandardRates")?.value === true) {
      this.payload[0].item_data[0].additional_detail.standard_rate =
        JSON.stringify({
          standardCostDate:
            this.additionalDetailsForm.get("standardCostDate")?.value,
          standardCostRate:
            this.additionalDetailsForm.get("standardCostRate")?.value,
          standardSellingPriceDate: this.additionalDetailsForm.get(
            "standardSellingPriceDate"
          )?.value,
          standardSellingPriceRate: this.additionalDetailsForm.get(
            "standardSellingPriceRate"
          )?.value,
        });
    }
    this.payload[0].item_data[0].openning_balance =
      this.stockItemForm.get("openingBalance")?.value;
    this.payload[0].item_data[0].allocation_data.quantity =
      this.stockItemForm.get("quantity")?.value;
    this.payload[0].item_data[0].allocation_data.rate =
      this.stockItemForm.get("rate")?.value;
    this.payload[0].item_data[0].allocation_data.amount =
      this.stockItemForm.get("value")?.value;
  }

  getItemGroupList() {
    var temp = [
      {
        login_token: this.login_token,
        branch_token: this.branch_token,
        object_flag_tpd_id: 0,
        page_number: 0,
        page_size: 0,
      },
    ];
    this.apiService.getItemGroupList(temp).subscribe(
      (response: any) => {
        console.log("Item Group List Response:", response?._Object);
        if (response && response?._Object) {
          // Handle the response as needed
          console.log("Item Group List:", response._Object);
          this.itemGroupList = response._Object;
        } else {
          console.error("Invalid response format:", response);
        }
      },
      (error) => {
        console.error("Error fetching item group list:", error);
      }
    );
  }

  getItemCategoryList() {
    var temp = [
      {
        login_token: this.login_token,
        branch_token: this.branch_token,
        object_flag_tpd_id: 0,
        page_number: 0,
        page_size: 0,
      },
    ];
    this.apiService.getItemCategoryList(temp).subscribe(
      (response: any) => {
        console.log("Item Category List Response:", response?._Object);
        if (response && response?._Object) {
          // Handle the response as needed
          console.log("Item Category List:", response._Object);
          this.itemCategoryList = response._Object;
        } else {
          console.error("Invalid response format:", response);
        }
      },
      (error) => {
        console.error("Error fetching item category list:", error);
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

  addStockItem() {
    this.isLoading = true;
    if (this.stockItemForm.get("name")?.value) {
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      console.log("Payload to be sent:", this.payload);
      this.apiService.addItemData(this.payload).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(["/dashboard/master/stock-item-list"], {
            queryParams: { reload: new Date().getTime() },
          });
          this.stockItemForm.reset();
          this.additionalDetailsForm.reset();
        },
        (error) => {
          this.isLoading = false;
          console.error("Error adding stock item:", error);
        }
      );
    } else {
      this.isLoading = false;
      this.stockItemForm.markAllAsTouched();
    }
  }
}
