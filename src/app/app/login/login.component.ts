import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppPreference, PreferenceKeys } from "../../shared/app-preference";
import { ApiServiceService } from "../../services/api-service.service";
import { HttpClientModule } from "@angular/common/http";

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
  enteredPin: any;

  constructor(
    private router: Router,
    private appPreference: AppPreference,
    private apiService: ApiServiceService
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
    this.confirmPin = await this.appPreference.getPin();
    console.log(
      "Login component initialized",
      await this.appPreference.getPin()
    );
  }

  addNumber(num: string) {
    const emptyIndex = this.pin.findIndex((digit) => digit === "");
    if (emptyIndex !== -1) {
      this.pin[emptyIndex] = num;

      // If PIN is complete (all 4 digits entered)
      if (emptyIndex === 3) {
        // Here you can add logic to save the PIN
        console.log("PIN complete:", this.pin.join(""));
      }
    }
  }

  deleteNumber() {
    const lastFilledIndex = this.pin
      .map((digit) => digit !== "")
      .lastIndexOf(true);
    if (lastFilledIndex !== -1) {
      this.pin[lastFilledIndex] = "";
    }
  }

  async submitPin() {
    if (this.pin.every((digit) => digit !== "")) {
      const finalPin = this.pin.join("");
      try {
        await this.appPreference.enablePin(finalPin);
        await this.appPreference.presentToast(
          "PIN set successfully",
          2000,
          "bottom",
          "success"
        );
        this.router.navigate(["/dashboard/settings"]);
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
            // Store user details in AppPreference
            await this.appPreference.set("_LoginToken", response?._LoginToken);
            // Store user name in AppPreference
            await this.appPreference.set(
              "_UserDetail",
              response?._UserDetail?.user_name
            );
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

  // Getter methods for easy access to form controls
  get user_name() {
    return this.loginForm.get("user_name");
  }
  get user_password() {
    return this.loginForm.get("user_password");
  }
}
