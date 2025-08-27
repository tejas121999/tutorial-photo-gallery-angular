import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppPreference, PreferenceKeys } from "../../shared/app-preference";
import { ApiServiceService } from "../../services/api-service.service";
import { HttpClientModule } from "@angular/common/http";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio/ngx";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  pin: string[] = ["", "", "", ""];
  usePin: boolean = false;
  confirmPin: any;
  enteredPin: string[] = ["", "", "", ""];
  isPinEnabled: any;
  isFingerprintEnabled: any;
  forgotPinClicked: boolean = false;
  isFingerprintAvailable: boolean = false;
  fingerprintType: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appPreference: AppPreference,
    private apiService: ApiServiceService,
    private faio: FingerprintAIO
  ) {
    this.loginForm = new FormGroup({
      user_name: new FormControl("", [Validators.required]),
      user_password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async () => {
      console.log("Query params changed");
      this.confirmPin = await this.appPreference.getPin();
      this.isPinEnabled = await this.appPreference.isPinEnabled();
      this.isFingerprintEnabled =
        await this.appPreference.isFingerprintEnabled();
      console.log("isFingerprintAvailable", this.isFingerprintEnabled);
      console.log("isPinEnabled", this.isPinEnabled);
    });

    // Check fingerprint availability
    try {
      const available = await this.faio.isAvailable();
      this.isFingerprintAvailable = true;
      this.fingerprintType = (available as any) || null;
      console.log("Fingerprint available:", this.fingerprintType);
    } catch (err) {
      this.isFingerprintAvailable = false;
      this.fingerprintType = null;
      console.log("Fingerprint not available", err);
    }
  }

  onForgotPin() {
    this.forgotPinClicked = true;
  }

  showPinView() {
    this.usePin = true;
    this.forgotPinClicked = false;
  }

  addNumber(num: string) {
    const emptyIndex = this.enteredPin.findIndex((digit) => digit === "");
    if (emptyIndex !== -1) {
      this.enteredPin[emptyIndex] = num;

      // If PIN is complete (all 4 digits entered)
      if (emptyIndex === 3) {
        // Here you can add logic to save the PIN
        console.log("PIN complete:", this.enteredPin.join(""));
      }
    }
  }

  deleteNumber() {
    const lastFilledIndex = this.enteredPin
      .map((digit) => digit !== "")
      .lastIndexOf(true);
    if (lastFilledIndex !== -1) {
      this.enteredPin[lastFilledIndex] = "";
    }
  }

  async submitPin() {
    if (this.enteredPin.every((digit) => digit !== "")) {
      const finalPin = this.enteredPin.join("");
      try {
        await this.appPreference
          .verifyPin(finalPin)
          .then(async (response: any) => {
            if (response) {
              var temp = [await this.appPreference.get("loginDetails")];
              this.apiService.userLogin(temp).subscribe(
                async (response: any) => {
                  // Store the authorization token from response
                  if (response && response?._AuthoriseToken) {
                    // set auth token in localStorage
                    this.appPreference.setAccessToken(response._AuthoriseToken);
                    localStorage.setItem(
                      "ACCESS_TOKEN",
                      response._AuthoriseToken
                    );
                    await this.appPreference.set(
                      "_LoginToken",
                      response?._LoginToken
                    );
                    // Store user name in AppPreference
                    let userDDetails = JSON.parse(
                      response?._UserDetail?.user_detail
                    );
                    await this.appPreference.set(
                      "branch_name",
                      response._BranchList[0].branch_name
                    );
                    console.log("User Details:", userDDetails);
                    await this.appPreference.set("_UserDetail", userDDetails);
                    await this.appPreference.set(
                      "branch_token_id",
                      response._BranchList[0].branch_token_id
                    );
                    var _BranchList: any[] = [];
                    response._BranchList.forEach((element: any) => {
                      _BranchList.push({
                        branch_code: element.branch_code,
                        branch_name: element.branch_name,
                        branch_token_id: element.branch_token_id,
                      });
                    });
                    await this.appPreference.set("_BranchList", _BranchList);
                    this.router.navigate(["/dashboard/home"]);
                    await this.appPreference.presentToast(
                      "Login Successfully!",
                      2000,
                      "bottom",
                      "success"
                    );
                  } else {
                    await this.appPreference.presentToast(
                      response?._Message,
                      2000,
                      "bottom",
                      "danger"
                    );
                  }
                },
                (error) => {
                  console.error("Login failed", error);
                  this.appPreference.presentToast(
                    "Login failed. Please try again.",
                    2000,
                    "bottom",
                    "danger"
                  );
                }
              );
            } else {
              await this.appPreference.presentToast(
                "PIN verification failed.",
                2000,
                "bottom",
                "danger"
              );
            }
          });
      } catch (error) {
        console.error("Error saving PIN:", error);
        await this.appPreference.presentToast(
          "Failed to set PIN",
          2000,
          "bottom",
          "danger"
        );
      }
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    if (this.loginForm.valid) {
      var temp = [
        {
          user_name: this.loginForm.get("user_name")?.value,
          user_password: this.loginForm.get("user_password")?.value,
          user_desk_url: "temp",
        },
      ];
      this.apiService.userLogin(temp).subscribe(
        async (response: any) => {
          console.log("Login successful, response?._LoginToken", response);
          // Store the authorization token from response
          if (response && response?._AuthoriseToken) {
            // set auth token in localStorage
            localStorage.setItem("ACCESS_TOKEN", response._AuthoriseToken);
            this.appPreference.setAccessToken(response._AuthoriseToken);
            // Store user details in AppPreference
            var loginDetails = {
              user_name: this.loginForm.get("user_name")?.value,
              user_password: this.loginForm.get("user_password")?.value,
              user_desk_url: "temp",
            };
            await this.appPreference.set("loginDetails", loginDetails);
            await this.appPreference.set("_LoginToken", response?._LoginToken);
            // Store user name in AppPreference
            let userDDetails = JSON.parse(response?._UserDetail?.user_detail);
            await this.appPreference.set(
              "branch_name",
              response._BranchList[0].branch_name
            );
            await this.appPreference.set("_UserDetail", userDDetails);
            await this.appPreference.set(
              "branch_token_id",
              response._BranchList[0].branch_token_id
            );
            var _BranchList: any[] = [];
            response._BranchList.forEach((element: any) => {
              _BranchList.push({
                branch_code: element.branch_code,
                branch_name: element.branch_name,
                branch_token_id: element.branch_token_id,
              });
            });
            await this.appPreference.set("_BranchList", _BranchList);
            this.router.navigate(["/dashboard/home"]);
            await this.appPreference.presentToast(
              "Login Successfully!",
              2000,
              "bottom",
              "success"
            );
          } else {
            await this.appPreference.presentToast(
              response?._Message,
              2000,
              "bottom",
              "danger"
            );
          }
        },
        (error) => {
          console.error("Login failed", error);
          this.appPreference.presentToast(
            "Login failed. Please try again.",
            2000,
            "bottom",
            "danger"
          );
        }
      );
    } else {
      this.appPreference.presentToast(
        "Please fill in all required fields correctly.",
        2000,
        "bottom",
        "danger"
      );
    }
  }

  // Trigger biometric authentication and perform login using stored credentials
  async useFingerprint() {
    // Ensure biometric is available
    if (!this.isFingerprintAvailable && !this.isFingerprintEnabled) {
      await this.appPreference.presentToast(
        "Biometric authentication is not available on this device.",
        2000,
        "bottom",
        "warning"
      );
      return;
    }

    // Ensure we have stored login details to use
    const loginDetails = await this.appPreference.get("loginDetails");
    if (!loginDetails) {
      await this.appPreference.presentToast(
        "No stored credentials found. Please login once using username/password to enable fingerprint login.",
        3000,
        "bottom",
        "warning"
      );
      return;
    }

    try {
      const result = await this.faio.show({
        clientSecret: " ", // required for Android keystore cipher; can be any string
        disableBackup: true,
        localizedFallbackTitle: "Use PIN",
        localizedReason: "Please authenticate to login",
      } as any);

      // result is usually 'Success' on success
      if (result) {
        // Use stored credentials to call API login (keeps same behavior as onLogin)
        var temp = [loginDetails];
        this.apiService.userLogin(temp).subscribe(
          async (response: any) => {
            if (response && response?._AuthoriseToken) {
              this.appPreference.setAccessToken(response._AuthoriseToken);
              localStorage.setItem("ACCESS_TOKEN", response._AuthoriseToken);
              await this.appPreference.set(
                "_LoginToken",
                response?._LoginToken
              );
              let userDDetails = JSON.parse(response?._UserDetail?.user_detail);
              await this.appPreference.set(
                "branch_name",
                response._BranchList[0].branch_name
              );
              await this.appPreference.set("_UserDetail", userDDetails);
              await this.appPreference.set(
                "branch_token_id",
                response._BranchList[0].branch_token_id
              );
              var _BranchList: any[] = [];
              response._BranchList.forEach((element: any) => {
                _BranchList.push({
                  branch_code: element.branch_code,
                  branch_name: element.branch_name,
                  branch_token_id: element.branch_token_id,
                });
              });
              await this.appPreference.set("_BranchList", _BranchList);
              this.router.navigate(["/dashboard/home"]);
              await this.appPreference.presentToast(
                "Login Successfully!",
                2000,
                "bottom",
                "success"
              );
            } else {
              await this.appPreference.presentToast(
                response?._Message,
                2000,
                "bottom",
                "danger"
              );
            }
          },
          (error) => {
            console.error("Login failed", error);
            this.appPreference.presentToast(
              "Login failed. Please try again.",
              2000,
              "bottom",
              "danger"
            );
          }
        );
      }
    } catch (err) {
      console.error("Biometric auth error", err);
      await this.appPreference.presentToast(
        "Biometric authentication failed or was cancelled.",
        2000,
        "bottom",
        "danger"
      );
    }
  }

  // Getter methods for easy access to form controls
  get user_name() {
    return this.loginForm.get("user_name");
  }
  get user_password() {
    return this.loginForm.get("user_password");
  }
}
