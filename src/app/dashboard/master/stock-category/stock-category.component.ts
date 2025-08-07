import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-stock-category",
  templateUrl: "./stock-category.component.html",
  styleUrls: ["./stock-category.component.scss"],
})
export class StockCategoryComponent {
  stockCategoryForm: FormGroup;
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

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
    });
  }

  async initializeData() {
    this.stockCategoryForm = this.fb.group({
      name: ["", Validators.required],
      alias: [""],
      under: [""],
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
      item_category_data: [
        {
          item_category_name: null,
          alias: null,
          under: null,
        },
      ],
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
    this.payload[0].item_category_data[0].item_category_name =
      this.stockCategoryForm.get("name")?.value;
    this.payload[0].item_category_data[0].alias =
      this.stockCategoryForm.get("alias")?.value;
    this.payload[0].item_category_data[0].under =
      this.stockCategoryForm.get("under")?.value;
  }

  addStockCategory() {
    this.isLoading = true;
    if (this.stockCategoryForm.get("name")?.value) {
      this.resetPayloadValuesToNull(this.payload);
      this.createPayload();
      console.log("Payload:", this.payload);
      this.apiService.addItemCategoryData(this.payload).subscribe(
        (response: any) => {
          this.isLoading = false;
          if (response._Object.length !== 0) {
            console.log("Godown created successfully:", response);
            this.router.navigate(["/dashboard/master/stock-category-list"], {
              queryParams: { reload: new Date().getTime() },
            });
          } else {
            console.error("Error creating godown:", response.message);
          }
        },
        (error) => {
          this.isLoading = false;
          console.error("API Error:", error);
        }
      );
    } else {
      this.isLoading = false;
      this.stockCategoryForm.markAllAsTouched();
    }
  }
}
