import { Storage } from "@ionic/storage-angular";
import { ToastController } from "@ionic/angular";
import { Inject, Injectable } from "@angular/core";

export enum PreferenceKeys {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  PROFILE_INFO = "PROFILE_INFO",
  PERMISSION = "PERMISSION",
}

@Injectable({
  providedIn: "root",
})
export class AppPreference {
  constructor(
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.init();
  }

  private _storage: Storage | null = null;
  isLoggedIn: boolean = false;

  async init() {
    // If using, define driver order here (SQLite first)
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  async get(key: string) {
    return await this._storage?.get(key);
  }

  async remove(key: string) {
    await this._storage?.remove(key);
  }

  async clear() {
    await this._storage?.clear();
  }

  async getAccessToken() {
    let accessToken = await this.get(PreferenceKeys.ACCESS_TOKEN);
    if (accessToken && typeof accessToken === "object") {
      accessToken = accessToken.token || null;
    }

    return accessToken;
  }

  isLogin() {
    const accessToken: any = this.getAccessToken();
    if (accessToken) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  async isUserLoggedIn() {
    const accessToken: any = this.getAccessToken();
    return accessToken && accessToken != "";
  }

  async presentToast(
    message: string,
    duration: number = 2000,
    position: "top" | "bottom" | "middle" = "bottom",
    color:
      | "warning"
      | "success"
      | "danger"
      | "primary"
      | "secondary" = "primary"
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      color,
    });
    toast.present();
  }
}
