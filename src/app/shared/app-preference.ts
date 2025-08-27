import { Storage } from "@ionic/storage-angular";
import { ToastController } from "@ionic/angular";
import { Inject, Injectable } from "@angular/core";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";

export enum PreferenceKeys {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  PROFILE_INFO = "PROFILE_INFO",
  PERMISSION = "PERMISSION",
  PIN = "PIN",
  PIN_ENABLED = "PIN_ENABLED",
  FINGER_PRINT = "FINGER_PRINT",
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
  private initPromise: Promise<void> | null = null;
  isLoggedIn: boolean = false;

  init(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this._init();
    return this.initPromise;
  }

  private async _init(): Promise<void> {
    // If using, define driver order here (SQLite first)
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any) {
    await this.init();
    await this._storage?.set(key, value);
  }

  async get(key: string) {
    await this.init();
    return await this._storage?.get(key);
  }

  async remove(key: string) {
    await this.init();
    await this._storage?.remove(key);
  }

  async clear() {
    await this.init();
    await this._storage?.clear();
  }

  async setAccessToken(token: string) {
    this.set(PreferenceKeys.ACCESS_TOKEN, { token });
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

  async isPinEnabled(): Promise<boolean> {
    return (await this.get(PreferenceKeys.PIN_ENABLED)) === true;
  }

  async getPin(): Promise<string | null> {
    return await this.get(PreferenceKeys.PIN);
  }

  async verifyPin(enteredPin: string): Promise<boolean> {
    const storedPin = await this.getPin();
    return storedPin === enteredPin;
  }

  async enablePin(pin: string): Promise<void> {
    await this.set(PreferenceKeys.PIN, pin);
    await this.set(PreferenceKeys.PIN_ENABLED, true);
  }

  async disablePin(): Promise<void> {
    await this.remove(PreferenceKeys.PIN);
    await this.set(PreferenceKeys.PIN_ENABLED, false);
  }

  async isFingerprintEnabled(): Promise<boolean> {
    return (await this.get(PreferenceKeys.FINGER_PRINT)) === true;
  }

  async enableFingerprint(): Promise<void> {
    await this.set(PreferenceKeys.FINGER_PRINT, true);
  }

  async disableFingerprint(): Promise<void> {
    await this.remove(PreferenceKeys.FINGER_PRINT);
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
