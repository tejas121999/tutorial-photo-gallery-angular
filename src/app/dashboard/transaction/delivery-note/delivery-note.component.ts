import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServiceService } from "src/app/services/api-service.service";
import { DataSharingService } from "src/app/services/data-sharing.service";
import { AppPreference } from "src/app/shared/app-preference";

@Component({
  selector: "app-delivery-note",
  templateUrl: "./delivery-note.component.html",
  styleUrls: ["./delivery-note.component.scss"],
})
export class DeliveryNoteComponent implements OnInit {
  branch_token: any;
  login_token: any;
  isLoading: boolean = false;
  deliveryNote: FormGroup;
  orderDetailsOpen: boolean = false;
  dispatchDetailsOpen: boolean = false;
  exportDetailsOpen: boolean = false;
  partyDetailsOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService
  ) {
    this.deliveryNote = this.fb.group({
      deliveryNoteNo: [""],
      referenceNo: [""],
      date: [""],
      billDate: [""],
      partyName: [""],
      salesLedger: [""],
      orderNo: [""],
      termsOfPayment: [""],
      otherReferences: [""],
      termsOfDelivery: [""],
      dispatchDocNo: [""],
      dispatchedThrough: [""],
      destination: [""],
      carrierAgentName: [""],
      billOfLanding: [""],
      dispatchDate: [""],
      receiptLocation: [""],
      flightNo: [""],
      portOfLoading: [""],
      portOfDischarge: [""],
      country: [""],
      shippingBillNo: [""],
      exportDate: [""],
      portCode: [""],
      buyer: [""],
      addressType: [""],
      mailingName: [""],
      address: [""],
      state: [""],
      partyPincode: [""],
      registrationType: [""],
      gstinUin: [""],
      consignee: [""],
      consigneeMailingName: [""],
      placeOfSupply: [""],
      narration: [""],
      subTotal: [""],
      taxes: [""],
      totalAmount: [""],
      lagers: this.fb.array([]),
      addedItem: this.fb.array([]),
    });
    this.dataSharingService.currentDeliveryNoteData.subscribe((data) => {
      if (data.length !== 0) {
        console.log("data", data);
        this.addItem(data);
      }
    });

    this.dataSharingService.currentDeliveryNoteLagersData.subscribe((data) => {
      console.log("data", data);
      if (data.length !== 0) {
        console.log("data", data);
        this.addLagers(data);
      }
    });
  }

  async initializeData() {}

  get itemFormArray() {
    return this.deliveryNote.get("addedItem") as FormArray;
  }

  get lagersFormArray() {
    return this.deliveryNote.get("lagers") as FormArray;
  }

  addItem(data: any) {
    const itemGroup = this.fb.group({
      item: [data.item],
      unit_name: [data.unit_name],
      quantity: [data.quantity],
      rate: [data.rate],
      amount: [data.amount],
    });
    this.itemFormArray.push(itemGroup);
  }

  addLagers(data: any[]) {
    data.forEach((item) => {
      const lagersGroup = this.fb.group({
        ledger_name: [item.ledger_name],
        percentage: ["20.0"],
        amount: ["30.0"],
      });

      this.lagersFormArray.push(lagersGroup);
    });
  }

  removeItem(index: number) {
    this.itemFormArray.removeAt(index);
  }

  editItem(index: number) {
    const itemGroup = this.itemFormArray.at(index) as FormGroup;
    // Implement your edit logic here
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      this.branch_token = await this.appPreference.get("branch_token_id");
      this.login_token = await this.appPreference.get("_LoginToken");
      console.log("Branch Token:", this.branch_token);
    });
  }
}
