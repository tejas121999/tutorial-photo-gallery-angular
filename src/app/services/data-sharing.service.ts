import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataSharingService {
  private dataSource = new BehaviorSubject<any[]>([]);
  currentData = this.dataSource.asObservable();
  lagersData = new BehaviorSubject<any[]>([]);
  currentLagersData = this.lagersData.asObservable();

  constructor() {}

  changeData(data: any) {
    this.dataSource.next(data);
  }

  changeLagersData(data: any) {
    this.lagersData.next(data);
  }
}
