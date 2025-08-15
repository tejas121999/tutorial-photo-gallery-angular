import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { AppPreference } from "src/app/shared/app-preference";
import { DataSharingService } from "src/app/services/data-sharing.service";

@Component({
  selector: "app-add-item-delivery-note",
  templateUrl: "./add-item-delivery-note.component.html",
  styleUrls: ["./add-item-delivery-note.component.scss"],
})
export class AddItemDeliveryNoteComponent implements OnInit {
  branch_token: any;
  login_token: any;
  addItemForm: FormGroup;
  stockItem: any[] = [];
  godownList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService
  ) {
    this.initializeData();
  }

  async initializeData() {
    this.addItemForm = this.fb.group({
      item: [""],
      godown: [""],
      quantity: [""],
      rate: [""],
      amount: [""],
    });

    this.addItemForm.get("quantity").valueChanges.subscribe(() => {
      this.updateAmount();
    });

    this.addItemForm.get("rate").valueChanges.subscribe(() => {
      this.updateAmount();
    });
  }

  updateAmount() {
    const quantity = this.addItemForm.get("quantity").value;
    const rate = this.addItemForm.get("rate").value;
    const amount = (Number(quantity) || 0) * (Number(rate) || 0);
    this.addItemForm.patchValue({
      amount: amount,
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
      this.getStockItemList();
      this.getGodownList();
    });
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

  getGodownList() {
    var temp = [
      {
        login_token: this.login_token,
        branch_token: this.branch_token,
        object_flag_tpd_id: 0,
        page_number: 0,
        page_size: 0,
      },
    ];
    this.apiService.getStoreList(temp).subscribe(
      (response: any) => {
        if (response?._Object?.length > 0) {
          this.godownList = response._Object;
        } else {
          this.godownList = [];
        }
      },
      (error) => {
        console.error("Error fetching godown list:", error);
      }
    );
  }

  sendData() {
    this.dataSharingService.changeDeliveryNoteData(this.addItemForm.value);
    this.router.navigate(["/dashboard/transaction/delivery-note"], {
      queryParams: { reload: new Date().getTime() },
    });
  }
}
