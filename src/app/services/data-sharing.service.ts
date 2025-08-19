import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataSharingService {
  // add item
  private dataSource = new BehaviorSubject<any[]>([]);
  currentData = this.dataSource.asObservable();

  changeData(data: any) {
    this.dataSource.next(data);
  }

  // add lagers
  lagersData = new BehaviorSubject<any[]>([]);
  currentLagersData = this.lagersData.asObservable();

  changeLagersData(data: any) {
    this.lagersData.next(data);
  }

  // delivery note add item
  private deliveryNoteData = new BehaviorSubject<any[]>([]);
  currentDeliveryNoteData = this.deliveryNoteData.asObservable();

  changeDeliveryNoteData(data: any) {
    console.log(data);
    this.deliveryNoteData.next(data);
  }

  // delivery note lagers
  deliveryNoteLagersData = new BehaviorSubject<any[]>([]);
  currentDeliveryNoteLagersData = this.deliveryNoteLagersData.asObservable();

  changeDeliveryNoteLagersData(data: any) {
    this.deliveryNoteLagersData.next(data);
  }

  lagerPaymentData = new BehaviorSubject<any[]>([]);
  currentLagerPaymentData = this.lagerPaymentData.asObservable();

  changeLagerPaymentData(data: any) {
    this.lagerPaymentData.next(data);
  }

  billSandryDetailsData = new BehaviorSubject<any[]>([]);
  currentBillSandryDetailsData = this.billSandryDetailsData.asObservable();

  changeBillSandryDetailsData(data: any) {
    this.billSandryDetailsData.next(data);
  }

  constructor() {}
}
